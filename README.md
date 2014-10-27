Shopify Timber
=====================

Timber is a theme framework for Shopify that helps you get your store up and running quickly. It provides all required theme templates, a starter set of liquid tags, and basic styles and modules for you to extend.

Styling and customization is left up to you. Some base styles and helpers are included, but there is **no need to remove any code before you start**. Simply download and begin designing.

Designing a store for a client? Earn 20% revenue through our <a href="http://www.shopify.com/partners">Partner program<a/>.

Three Ways to Get Started
---------------------
1. Download the [latest release](https://github.com/Shopify/Timber/releases)
2. Clone the repo `git clone https://github.com/Shopify/Timber.git`
3. Or install with [Bower](http://bower.io/) `bower install timber`

Setup with Grunt
---------------------
Grunt is an optional layer for developing with Timber. To setup Grunt for Timber development, follow these steps:

1. Navigate to your local Timber files in Terminal
2. Install Grunt globally
<small>You may need to preface the command below with `sudo` to use proper permissions</small>

        $ npm install -g grunt-cli

3. Install required packages

        $ npm install

4. Bundle dependencies

        $ npm install

5. Insert private app keys

  Add your private app keys to `grunt-config-sample.json` and rename file to `grunt-config.json`. [Learn to make a private app](http://docs.shopify.com/api/authentication/creating-a-private-app).

----------

### Grunt Tasks
`$ grunt`
- Default task
- Watches `stylesheets/` folder and concatenates styles into `theme/assets/timber.scss.liquid`
- Automatically compresses image files in `assets/`
- Uploads files in `theme/` to your store

----------

`$ grunt upload`
- Concatenates stylesheets, compresses images, and uploads all theme files to your shop
- Note, this will overwrite all files (including active settings) so use sparingly
  - To upload all files except your settings.json, use `grunt shopify:upload --no-json`

----------

`$ grunt zip`
- Concatenates stylesheets, compresses images, and creates a zip file with only the valid theme files

If you don't want to use Grunt, simply use the contents of `/theme` for your development needs.

----------

Documentation
---------------------
Visit the [Timber's Documentation](http://shopify.com/timber) page to find out more about the templates, liquid tags, CSS framework, and JavaScript modules included.

Timber's documentation is hosted on [GitHub Pages](http://pages.github.com/). View the raw files in the [gh-pages branch](https://github.com/Shopify/Timber/tree/gh-pages). Please report any discrepancies, bugs, or requests in [issues](https://github.com/Shopify/Timber/issues).

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

Support
---------------------
Get involved with Timber or follow along with updates and news.

- Track all issues and feature requests here on GitHub.
- Follow author [@cshold on Twitter](http://twitter.com/cshold).
- Provide feedback at timber@shopify.com.

Additional resources
---------------------
- [Themes Documentation][1]: Learn more about Liquid and theme templates.
- [Theme Gem][2]: Run the command line for a more intimate way of managing your theme files.
- [Desktop Theme Editor][3]: For Mac OS X users, we recommend our free app to sync theme files in development.
- [Liquid Tag Cheat Sheet][4]
- [Free Workshops][5]: Sign up for a free Shopify For Designers workshop in a city near you.
- Need more help? Ask a question in our [Design Forums][6].

License
---------------------
Timber is released under the [MIT License](LICENSE).

[1]: http://docs.shopify.com/themes
[2]: https://github.com/Shopify/shopify_theme
[3]: http://apps.shopify.com/desktop-theme-editor
[4]: http://cheat.markdunkley.com
[5]: http://meetup.shopify.com/
[6]: http://ecommerce.shopify.com/c/ecommerce-design
