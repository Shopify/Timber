## Deprecation warning ⚠️

The Timber theme is no longer being maintained by Shopify.  Developers are encouraged to check out [Slate](https://github.com/Shopify/slate) -
a theme scaffolding and command line tool built for developing Shopify themes.

You can continue to use Timber; however, this repo will not be kept up-to-date with changes in Shopify theme development.

---

Shopify Timber
=====================

Timber is a theme framework for Shopify that helps you get your store up and running quickly. It provides all required theme templates, a starter set of liquid tags, and some basic styles and modules for you to extend on.

Styling and customization is left up to you. Some base styles and helpers are included, but there is **no need to remove any code before you start**. Simply download and get designing.

Designing a store for a client? Earn revenue through our <a href="http://www.shopify.com/partners">Partner program<a/>.

Ways to Get Started
---------------------
- Download the [latest release](https://github.com/Shopify/Timber/releases)
- Clone the repo `git clone https://github.com/Shopify/Timber.git`
- Or install with [Bower](http://bower.io/) `bower install timber`

Demo Stores
---------------------
- [Demo Store](https://timber-demo.myshopify.com/): A store setup with some products, blog posts, and customer accounts
- [Empty Store](https://timber-demo-empty.myshopify.com/): A fresh store, just what you should expect when you install on your new store

For a set of demo products to use during development, [download this CSV file](http://www.tetchi.ca/wp-content/uploads/2013/04/products1.csv) and import it on our products page.

Basic structure
---------------
```
├── assets
│   └── Javascript, CSS, and theme images
├── layout
│   ├── theme.liquid
│   └── optional alternate layouts
├── snippets
│   └── custom code snippets
├── spec
│   └── tests and helpers
├── templates
│   ├── 404.liquid
│   ├── article.liquid
│   ├── blog.liquid
│   ├── cart.liquid
│   ├── collection.liquid
│   ├── collection.list.liquid
│   ├── index.liquid
│   ├── list-collections.liquid
│   ├── page.contact.liquid
│   ├── page.liquid
│   ├── product.liquid
│   ├── search.liquid
│   └── customers
│         └── required templates if customer accounts are enabled
├── config.yml
│   └── if using the theme gem (see link under Additional Resources)
```

i18n testing
---------------------
Tests make sure there are no missing or extra i18n strings or invalid html in your locale liquid files.

All PRs must pass the tests before being merged. Check the test status when you open a new PR on GitHub, or locally with the following.

- `bundle install` to install all the dependecies
- `rspec spec` to run all the tests


Additional resources
---------------------
- [Themes Documentation][1]: Learn more about Liquid and theme templates.
- [Shopify Theme Kit][2]: A cross-platform command line tool for building Shopify Themes.
- [Liquid Cheat Sheet][3]
- [Retail Tours][4]: Sign up for a workshop in a city near you to learn all things Shopify.
- Need more help? Ask a question in our [Design Forums][5].

License
---------------------
Timber is released under the [MIT License](LICENSE).

[1]: http://help.shopify.com/themes
[2]: ttps://github.com/Shopify/themekit
[3]: https://www.shopify.ca/partners/shopify-cheat-sheet
[4]: https://www.shopify.com/retailtour
[5]: http://ecommerce.shopify.com/c/ecommerce-design
