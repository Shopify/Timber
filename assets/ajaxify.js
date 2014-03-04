// (c) Copyright 2013 Jaded Pixel. Author: Carson Shold (@cshold). All Rights Reserved.

/*
 * Ajaxify Shopify
 *
 * Ajaxify the add to cart experience and flip the button so it looks cool,
 * show the cart in a modal, or a 3D drawer.
 *
 * This file includes
 *    - Modernizer | Slim custom build
 *    - Basic Shopify Ajax API calls
 *    - Ajaxify plugin
*/


/*
 * Plugin Notes
 *
 * In order to update the cart count on your page when adding a product,
 * warp the number in a span and pass it's selector into the 'cartCountSelector' option.
 *
 * Similarly to the cart count, you can add a selector for
 * 'cartCostSelector' to update the total price when an item is added.
 *
 * If using the drawer method, pass a selector into the 'toggleCartButton' option
 * to toggle the cart open and closed. Leave this out if you'd like the link to
 * take the user to the /cart page.
*/


// JQUERY API (c) Copyright 2009 Jaded Pixel. Author: Caroline Schnapp. All Rights Reserved. Includes slight modifications to addItemFromForm

if ((typeof Shopify) === 'undefined') { Shopify = {}; }
Shopify.money_format = '${{amount}}';

// -------------------------------------------------------------------------------------
// API Helper Functions
// -------------------------------------------------------------------------------------
function floatToString(numeric, decimals) {
  var amount = numeric.toFixed(decimals).toString();
  if(amount.match(/^\.\d+/)) {return "0"+amount; }
  else { return amount; }
};
function attributeToString(attribute) {
  if ((typeof attribute) !== 'string') {
    attribute += '';
    if (attribute === 'undefined') {
      attribute = '';
    }
  }
  return jQuery.trim(attribute);
}
function getCookie(c_name) {
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + "=");
  }
  if (c_start == -1) {
    c_value = null;
  }
  else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start,c_end));
  }
  return c_value;
}

// -------------------------------------------------------------------------------------
// API Functions
// -------------------------------------------------------------------------------------
Shopify.formatMoney = function(cents, format) {

  if (typeof cents == 'string') cents = cents.replace('.','');
  var value = '';
  var patt = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = (format || this.money_format);

  function addCommas(moneyString) {
    return moneyString.replace(/(\d+)(\d{3}[\.,]?)/,'$1,$2');
  }

  switch(formatString.match(patt)[1]) {
    case 'amount':
      value = addCommas(floatToString(cents/100.0, 2));
      break;
    case 'amount_no_decimals':
      value = addCommas(floatToString(cents/100.0, 0));
      break;
    case 'amount_with_comma_separator':
      value = floatToString(cents/100.0, 2).replace(/\./, ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = addCommas(floatToString(cents/100.0, 0)).replace(/\./, ',');
      break;
  }
  return formatString.replace(patt, value);
};

Shopify.onProduct = function(product) {
  // alert('Received everything we ever wanted to know about ' + product.title);
};

Shopify.onCartUpdate = function(cart) {
  // alert('There are now ' + cart.item_count + ' items in the cart.');
};

Shopify.updateCartNote = function(note, callback) {
  var params = {
    type: 'POST',
    url: '/cart/update.js',
    data: 'note=' + attributeToString(note),
    dataType: 'json',
    success: function(cart) {
      if ((typeof callback) === 'function') {
        callback(cart);
      }
      else {
        Shopify.onCartUpdate(cart);
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      Shopify.onError(XMLHttpRequest, textStatus);
    }
  };
  jQuery.ajax(params);
};

Shopify.onError = function(XMLHttpRequest, textStatus) {
  var data = eval('(' + XMLHttpRequest.responseText + ')');
  if (!!data.message) {
    // alert(data.message + '(' + data.status  + '): ' + data.description);
  } else {
    // alert('Error : ' + Shopify.fullMessagesFromErrors(data).join('; ') + '.');
  }
};

// -------------------------------------------------------------------------------------
// POST to cart/add.js returns the JSON of the line item associated with the added item.
// -------------------------------------------------------------------------------------
Shopify.addItem = function(variant_id, quantity, callback) {
  var quantity = quantity || 1;
  var params = {
    type: 'POST',
    url: '/cart/add.js',
    data: 'quantity=' + quantity + '&id=' + variant_id,
    dataType: 'json',
    success: function(line_item) {
      if ((typeof callback) === 'function') {
        callback(line_item);
      }
      else {
        Shopify.onItemAdded(line_item);
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      Shopify.onError(XMLHttpRequest, textStatus);
    }
  };
  jQuery.ajax(params);
};

// ---------------------------------------------------------
// POST to cart/add.js returns the JSON of the line item.
//   - Allow use of form element instead of id
//   - Allow custom error callback
// ---------------------------------------------------------
Shopify.addItemFromForm = function(form, callback, errorCallback) {
    var params = {
      type: 'POST',
      url: '/cart/add.js',
      data: jQuery(form).serialize(),
      dataType: 'json',
      success: function(line_item) {
        if ((typeof callback) === 'function') {
          callback(line_item, form);
        }
        else {
          Shopify.onItemAdded(line_item, form);
        }
      },
      error: function(XMLHttpRequest, textStatus) {
        if ((typeof errorCallback) === 'function') {
          errorCallback(XMLHttpRequest, textStatus);
        }
        else {
          Shopify.onError(XMLHttpRequest, textStatus);
        }
      }
    };
    jQuery.ajax(params);
};

// ---------------------------------------------------------
// GET cart.js returns the cart in JSON.
// ---------------------------------------------------------
Shopify.getCart = function(callback) {
  jQuery.getJSON('/cart.js', function (cart, textStatus) {
    if ((typeof callback) === 'function') {
      callback(cart);
    }
    else {
      Shopify.onCartUpdate(cart);
    }
  });
};

// ---------------------------------------------------------
// GET products/<product-handle>.js returns the product in JSON.
// ---------------------------------------------------------
Shopify.getProduct = function(handle, callback) {
  jQuery.getJSON('/products/' + handle + '.js', function (product, textStatus) {
    if ((typeof callback) === 'function') {
      callback(product);
    }
    else {
      Shopify.onProduct(product);
    }
  });
};

// ---------------------------------------------------------
// POST to cart/change.js returns the cart in JSON.
// ---------------------------------------------------------
Shopify.changeItem = function(variant_id, quantity, callback) {
  var params = {
    type: 'POST',
    url: '/cart/change.js',
    data:  'quantity='+quantity+'&id='+variant_id,
    dataType: 'json',
    success: function(cart) {
      if ((typeof callback) === 'function') {
        callback(cart);
      }
      else {
        Shopify.onCartUpdate(cart);
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      Shopify.onError(XMLHttpRequest, textStatus);
    }
  };
  jQuery.ajax(params);
};


/* Modernizr 2.7.0 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms-csstransforms3d-touch-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function y(a){i.cssText=a}function z(a,b){return y(l.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b){for(var d in a){var e=a[d];if(!B(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function D(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}function E(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return A(b,"string")||A(b,"undefined")?C(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),D(e,b,c))}var d="2.7.0",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:v(["@media (",l.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},p.csstransforms=function(){return!!E("transform")},p.csstransforms3d=function(){var a=!!E("perspective");return a&&"webkitPerspective"in f.style&&v("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a};for(var F in p)x(p,F)&&(u=F.toLowerCase(),e[u]=p[F](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),h=j=null,e._version=d,e._prefixes=l,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return C([a])},e.testAllProps=E,e.testStyles=v,e}(this,this.document);


// -------------------------------------------------------------------------------------
// Ajaxify Shopify Add To Cart
// -------------------------------------------------------------------------------------

var ajaxifyShopify = (function(module, $) {

  'use strict';

  // Public functions
  var init;

  // Private general variables
  var settings, cartInit, $drawerHeight, $cssTransforms, $cssTransforms3d, $isTouch;

  // Private plugin variables
  var $formContainer, $btnClass, $wrapperClass, $addToCart, $flipClose, $flipCart, $flipContainer, $cartCountSelector, $cartCostSelector, $toggleCartButton, $modal, $cartContainer, $drawerCaret, $modalContainer, $modalOverlay, $closeCart, $drawerContainer;

  // Private functions
  var updateCountPrice, flipSetup, revertFlipButton, modalSetup, showModal, hideModal, drawerSetup, showDrawer, hideDrawer, sizeDrawer, formOverride, itemAddedCallback, itemErrorCallback, cartUpdateCallback, flipCartUpdateCallback, buildCart, cartTemplate,adjustCart, adjustCartCallback, scrollTop, isEmpty, log;

  /**
   * Initialise the plugin and define global options
   */
  init = function (options) {

    // Default settings
    settings = {
      debug: true,
      method: 'drawer', // Method options are drawer, modal, and flip. Default is drawer.
      formSelector: 'form[action="/cart/add"]',
      addToCartSelector: 'input[type="submit"]',
      cartCountSelector: null,
      cartCostSelector: null,
      toggleCartButton: null,
      btnClass: null,
      wrapperClass: null,
      useCartTemplate: false
    };

    // Override defaults with arguments
    $.extend(settings, options);

    // Make sure method is lower case
    settings.method = settings.method.toLowerCase();

    // Select DOM elements
    $formContainer     = $(settings.formSelector);
    $btnClass          = settings.btnClass;
    $wrapperClass      = settings.wrapperClass;
    $addToCart         = $formContainer.find(settings.addToCartSelector);
    $flipContainer     = null;
    $flipClose         = null;
    $cartCountSelector = $(settings.cartCountSelector);
    $cartCostSelector  = $(settings.cartCostSelector);
    $toggleCartButton  = $(settings.toggleCartButton);
    $modal             = null;

    // CSS Checks
    $cssTransforms   = Modernizr.csstransforms;
    $cssTransforms3d = Modernizr.csstransforms3d;
    $isTouch         = Modernizr.touch;

    // Touch check
    if ($isTouch) {
      $('body').addClass('ajaxify-touch');
    }

    // Handle each case add to cart method
    switch (settings.method) {

      case 'flip':
        flipSetup();
        break;

      case 'modal':
        modalSetup();
        break;

      case 'drawer':
        drawerSetup();
        break;
    }

    if ( $addToCart.length ) {
      // Take over the add to cart form submit
      formOverride();
    }

    // Run this function in case we're using the quantity selector outside of the cart
    adjustCart();

  };

  updateCountPrice = function (cart) {
    if ($cartCountSelector) {
      $cartCountSelector.html(cart.item_count);
    }
    if ($cartCostSelector) {
      var price = Shopify.formatMoney(cart.total_price);
    }
  };

  flipSetup = function () {

    // Build and append the drawer in the DOM
    drawerSetup();

    // Stop if there is no add to cart button
    if ( !$addToCart.length ) {
      return
    }

    // Wrap the add to cart button in a div
    $addToCart.addClass('flip-front').wrap('<div class="flip"></div>');

    // Write a (hidden) Checkout button, a loader, and the extra view cart button
    var checkoutBtn = $('<a href="/checkout" class="flip-back" style="background-color: #C00; color: #fff;" id="flip__checkout">Checkout</a>').addClass($btnClass),
        flipLoader = $('<span class="ajaxifyCart__loader"></span>'),
        // flipExtra = $('<div class="flip__extra">or <a href="#" class="flip__cart">View Cart (<span></span>)</a> <a href="#" class="flip__close" title="Add another one">&times;</a></div>');
        flipExtra = $('<div class="flip__extra">or <a href="#" class="flip__cart">View Cart (<span></span>)</a></div>');

    // Append checkout button and loader
    checkoutBtn.insertAfter($addToCart);
    flipLoader.insertAfter(checkoutBtn);

    // Setup new selectors
    $flipContainer = $('.flip');

    if (!$cssTransforms3d) {
      $flipContainer.addClass('no-transforms')
    }

    // Setup extra selectors once appended
    flipExtra.insertAfter($flipContainer);
    // $flipClose = $('.flip__close');
    $flipCart = $('.flip__cart');

    // Close and view cart buttons
    // $flipClose.on('click', function(e) {
    //   e.preventDefault();
    //   revertFlipButton();
    // });

    $flipCart.on('click', function(e) {
      e.preventDefault();
      showDrawer(true);
    });

    // Reset the button if a user changes a variation
    $('input[type="checkbox"], input[type="radio"], select', $formContainer).on('click', function() {
      revertFlipButton();
    })

  };

  revertFlipButton = function () {

    $flipContainer.removeClass('is-flipped');

  };

  modalSetup = function () {

    // Create modal DOM elements
    var modalContainer = '<div id="ajaxifyModal"> \
          <div id="ajaxifyCart" class="ajaxifyCart__content"></div> \
        </div>',
        modalOverlay = '<div id="ajaxifyCart-overlay"></div>';

    // Append modal and overlay to body
    $('body').append(modalContainer).append(modalOverlay);

    // Modal selectors
    $modalContainer = $('#ajaxifyModal');
    $modalOverlay   = $('#ajaxifyCart-overlay');
    $cartContainer  = $('#ajaxifyCart');

    // Add a class if CSS translate isn't available
    if (!$cssTransforms) {
      $modalContainer.addClass('no-transforms')
    }

    // Toggle modal with cart button
    if ($toggleCartButton) {
      $toggleCartButton.on('click', function(e) {
        e.preventDefault();

        if ( $modalContainer.hasClass('is-visible') ) {
          hideModal();
        } else {
          showModal(true);
        }
      });
    }

  };

  showModal = function (toggle) {
    // Build the cart if it isn't already there
    if ( !cartInit && toggle ) {
      Shopify.getCart(cartUpdateCallback);
    }

    if ($modalContainer) {
      $modalContainer.addClass('is-visible');
      $modalOverlay.off( 'click', hideModal );
      $modalOverlay.on( 'click', hideModal );
    }
  };

  hideModal = function () {
    if ($modalContainer) {
      $modalContainer.removeClass('is-visible');
    }
  };

  drawerSetup = function () {

    // Create drawer DOM elements
    var drawerContainer = '<div id="ajaxifyDrawer"> \
        <div id="ajaxifyCart" class="ajaxifyCart__content ' + $wrapperClass +' "></div> \
        </div> \
        <div class="ajaxifyDrawer-caret"><span></span></div>';

    // Append drawer and overlay to body
    $('body').prepend(drawerContainer);

    // Drawer selectors
    $drawerContainer = $('#ajaxifyDrawer');
    $cartContainer   = $('#ajaxifyCart');
    $drawerCaret     = $('.ajaxifyDrawer-caret > span');

    // Toggle drawer with cart button
    if ($toggleCartButton) {
      $toggleCartButton.on('click', function(e) {
        e.preventDefault();

        if ( $drawerContainer.hasClass('is-visible') ) {
          hideDrawer();
        } else {
          showDrawer(true);
        }

      });
    }

    var timeout;

    // Position caret and size drawer on resize if drawer is visible
    $(window).resize(function() {
      clearTimeout(timeout);
      timeout = setTimeout(function(){
        if ($drawerContainer.hasClass('is-visible')) {
          positionCaret();
          sizeDrawer();
        }
      }, 500);
    });

    // Position the caret the first time
    positionCaret();

    // Position the caret
    function positionCaret() {
      // Get the position of the toggle button to align the carat with
      var togglePos = $toggleCartButton.offset(),
          toggleWidth = $toggleCartButton.outerWidth(),
          toggleMiddle = togglePos.left + toggleWidth/2;

      $drawerCaret.css('left', toggleMiddle + 'px');
    }
  };

  showDrawer = function (toggle) {

    console.log('show drawer');

    // If we're toggling with the flip method, use a special callback
    if (settings.method == 'flip') {
      Shopify.getCart(flipCartUpdateCallback);
    }
    // opening the drawer for the first time
    else if ( !cartInit && toggle) {
      Shopify.getCart(cartUpdateCallback);
    }
    // simple toggle? just size it
    else if ( cartInit && toggle ) {
      sizeDrawer();
    }

    // Show the drawer
    $drawerContainer.addClass('is-visible');

    scrollTop();

  };

  hideDrawer = function () {
    $drawerContainer.removeAttr('style').removeClass('is-visible');

    scrollTop();
  };

  sizeDrawer = function ($empty) {
    if ($empty) {
      $drawerContainer.css('height',  '0px');
    } else {
      $drawerHeight = $cartContainer.outerHeight();
      $drawerContainer.css('height',  $drawerHeight + 'px');
    }
  };

  formOverride = function () {
    $formContainer.submit(function(e) {
      e.preventDefault();

      Shopify.addItemFromForm(e.target, itemAddedCallback, itemErrorCallback);

      // Set the flip button to a loading state
      switch (settings.method) {
        case 'flip':
          $flipContainer.addClass('flip--is-loading');
          break;
      }

    });

  };

  itemAddedCallback = function (product) {
    // Slight delay of flip to mimic a longer load
    switch (settings.method) {
      case 'flip':
        setTimeout(function () {
          $flipContainer.removeClass('flip--is-loading').addClass('is-flipped');
        }, 1000);
        break;
    }
    Shopify.getCart(cartUpdateCallback);
  };

  itemErrorCallback = function (error) {
    switch (settings.method) {
      case 'flip':
        $flipContainer.removeClass('flip--is-loading');
        break;
    }
  };

  cartUpdateCallback = function (cart) {
    // Update quantity and price
    updateCountPrice(cart);

    switch (settings.method) {

      case 'flip':
        $('.flip__cart span').html(cart.item_count);
        break;

      case 'modal':
        buildCart(cart);
        showModal();
        break;

      case 'drawer':
        buildCart(cart);
        showDrawer();
        break;
    }

  };

  flipCartUpdateCallback = function (cart) {
    buildCart(cart);
  };

  buildCart = function (cart) {

    // Show empty cart
    if (cart.item_count <= 0) {
      $cartContainer.empty();
      $cartContainer.append('<h2>You cart is empty</h2>');
      sizeDrawer();
      return;
    }

    // Empty the current cart items
    $cartContainer.empty();

    // Use the /cart template, or JS-defined layout based on settings
    if (settings.useCartTemplate) {
      cartTemplate(cart);
      return;
    }

    // JS-defined cart layout
    var items = '';
    $.each(cart.items, function(index, cartItem) {

      var itemAdd = cartItem.quantity + 1,
          itemMinus = cartItem.quantity - 1,
          itemQty = cartItem.quantity + ' x';

      /* Hack to get product image thumbnail
       *   - Remove file extension, add _small, and re-add extension
      */
      var prodImg = cartItem.image.replace(/(\.[^.]*)$/, "_small$1");
      var prodName = cartItem.title.replace(/(\-[^-]*)$/, "");
      var prodVariation = cartItem.title.replace(/^[^\-]*/, "").replace(/-/, "");

      items += '<div class="ajaxifyCart__product"> \
          <div class="ajaxifyCart__row" data-id="'+ cartItem.variant_id +'"> \
            <div class="ajaxifyCart__media"> \
              <a href="'+cartItem.url+'"> <img src="' + prodImg + '" width="60" alt=""></a> \
            </div> \
            <div class="ajaxifyCart__col1"> \
              <p><a href="'+cartItem.url+'">'+ prodName +'</a></p> \
              <p><small>'+ prodVariation +'</small></p> \
            </div> \
            <div class="ajaxifyCart__col2"> \
              <div class="ajaxifyCart__qty"> \
                <input type="text" class="ajaxifyCart__num" value="'+ itemQty +'" min="0" data-id="'+ cartItem.variant_id +'"> \
                <span class="ajaxifyCart__qty-adjuster ajaxifyCart__add" data-id="'+ cartItem.variant_id +'" data-qty="' + itemAdd + '">+</span> \
                <span class="ajaxifyCart__qty-adjuster ajaxifyCart__minus" data-id="'+ cartItem.variant_id +'" data-qty="' + itemMinus + '">-</span> \
              </div> \
            </div> \
            <div class="ajaxifyCart__col3"> \
              <p>'+ Shopify.formatMoney(cartItem.price) +'</p> \
            </div> \
            <div class="ajaxifyCart__col4"> \
              <p><a href="#" class="ajaxifyCart__remove" data-id="'+ cartItem.variant_id +'" data-qty="0">Remove from cart</a></p> \
            </div> \
          </div> \
        </div>';

      if ( index == (cart.items.length-1) ) {
        var cartWrap = '<form action="/cart" method="post"> \
            <h2 class="ajaxifyCart__title">Your Shopping Cart \
              <span class="ajaxifyCart__close" title="Close Cart">Close Cart</span> \
            </h2> \
            <div class="ajaxifyCart__products">'
            + items +
            '</div> \
            <div class="ajaxifyCart__row ajaxifyCart__summary"> \
              <div class="ajaxifyCart__total"> \
                <p>Subtotal</p> \
              </div> \
              <div class="ajaxifyCart__col3"> \
                <p>' + Shopify.formatMoney(cart.total_price) + '</p> \
              </div> \
              <div class="ajaxifyCart__col4"> \
                <input type="submit" class="' + $btnClass + '" name="checkout" value="Checkout" /> \
              </div> \
            </div></form>';

        $cartContainer.append(cartWrap);

        $closeCart = $('.ajaxifyCart__close');
        $closeCart.off( 'click', hideModal );
        $closeCart.on( 'click', hideModal );
      }
    });

    // With new elements we need to relink the adjust cart functions
    adjustCart();

    // Size drawer at this point
    switch (settings.method) {
      case 'flip':
      case 'drawer':
        if (cart.item_count > 0) {
          sizeDrawer();
        } else {
          sizeDrawer('empty');
        }
        break;
      default:
        break;
    }

    // Mark the cart as built
    cartInit = true;
  };

  cartTemplate = function (cart) {
    $cartContainer.load('/cart form[action="/cart"]', function() {

      // With new elements we need to relink the adjust cart functions
      adjustCart();

      // Size drawer at this point
      switch (settings.method) {
        case 'flip':
        case 'drawer':
          if (cart.item_count > 0) {
            sizeDrawer();

            // Since your /cart template might use larger images, resize again
            setTimeout(function() {
              sizeDrawer();
            }, 500);
          } else {
            sizeDrawer('empty');
          }
          break;
        default:
          break;
      }

      // Mark the cart as built
      cartInit = true;
    });
  }

  adjustCart = function () {
    // This function runs on load, and when the cart is reprinted.

    // Update quantify selectors
    var qtyAdjust = $('.ajaxifyCart__qty span');

    // Add or remove from the quantity
    qtyAdjust.off('click');
    qtyAdjust.on('click', function() {
      var el = $(this),
          id = el.data('id'),
          qtySelector = el.siblings('.ajaxifyCart__num'),
          qty = parseInt( qtySelector.val() );

      // Add or subtract from the current quantity
      if (el.hasClass('ajaxifyCart__add')) {
        qty = qty + 1;
      } else {
        qty = qty - 1;
        if (qty <= 1) qty = 1;
      }

      // If it has a data-id, update the cart.
      // Otherwise, just update the input's number
      if (id) {
        updateQuantity(id, qty);
      } else {
        qtySelector.val(qty);
      }

    });

    // Update quantity based on input on change
    var qtyInput = $('.ajaxifyCart__num');
    qtyInput.off('change');
    qtyInput.on('change', function() {
      var el = $(this),
          id = el.data('id'),
          qty = el.val();

      // Make sure we have a valid integer
      if( (parseFloat(qty) == parseInt(qty)) && !isNaN(qty) ) {
        // We have a number!
      } else {
        // Not a number. Default to 1.
        el.val(1);
        return;
      }

      // Only update the cart via ajax if we have a variant ID to work with
      if (id) {
        updateQuantity(id, qty);
      }
    });

    // Highlight the text when focused
    qtyInput.off('focus');
    qtyInput.on('focus', function() {
      var el = $(this);
      setTimeout(function() {
        el.select();
      }, 50);
    });

    // Completely remove product
    $('.ajaxifyCart__remove').on('click', function(e) {
      e.preventDefault();
      var el = $(this),
          id = el.data('id'),
          qty = el.data('qty');

      updateQuantity(id, qty);
    });

    function updateQuantity(id, qty) {
      var row = $('.ajaxifyCart__row[data-id="' + id + '"]').parent().addClass('ajaxifyCart--is-loading');

      if ( qty == 0 ) {
        row.addClass('is-removed');
      }

      // Slight delay to make sure removed animation is done
      setTimeout(function() {
        Shopify.changeItem(id, qty, adjustCartCallback);
      }, 250);
    }

    // Save note anytime it's changed
    var noteArea = $('textarea[name="note"]');
    noteArea.off('change');
    noteArea.on('change', function() {
      var newNote = $(this).val();

      // Simply updating the cart note in case they don't click update/checkout
      Shopify.updateCartNote(newNote, function(cart) {});
    });

  };

  adjustCartCallback = function (cart) {
    // Update quantity and price
    updateCountPrice(cart);

    // Hide the modal or drawer if we're at 0 items
    if ( cart.item_count == 0 ) {

      // Handle each add to cart method
      switch (settings.method) {

        case 'modal':
          hideModal();
          break;

        case 'flip':
        case 'drawer':
          hideDrawer();
          break;
      }

    }

    // Reprint cart
    Shopify.getCart(buildCart);

  };

  scrollTop = function () {
    if ($('body').scrollTop() > 0) {
      $('html, body').animate({
        scrollTop: 0
      }, 250, 'swing');
    }
  };

  isEmpty = function(el) {
    return !$.trim(el.html());
  };

  log = function (arg) {
    if (settings && settings.debug && window.console) {
      try {
        console.log(arg);
      }
      catch (e) {}
    }

  };

  module = {
    init: init
  };

  return module;

}(ajaxifyShopify || {}, jQuery));