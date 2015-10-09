Shopify Timber [![Circle CI](https://circleci.com/gh/Shopify/Timber.svg?style=svg)](https://circleci.com/gh/Shopify/Timber)
=====================

Timber is a theme framework for Shopify that helps you get your store up and running quickly. It provides all required theme templates, a starter set of liquid tags, and some basic styles and modules for you to extend on.

Styling and customization is left up to you. Some base styles and helpers are included, but there is **no need to remove any code before you start**. Simply download and get designing.

Designing a store for a client? Earn 20% revenue through our <a href="http://www.shopify.com/partners">Partner program<a/>.

Ways to Get Started
---------------------
- Download the [latest release](https://github.com/Shopify/Timber/releases)
- Clone the repo `git clone https://github.com/Shopify/Timber.git`
- Or install with [Bower](http://bower.io/) `bower install timber`

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

Support
---------------------
Get involved with Timber or follow along with updates and news.

- Track all issues and feature requests here on GitHub.
- Follow author [@cshold on Twitter](http://twitter.com/cshold).

Additional resources
---------------------
- [Themes Documentation][1]: Learn more about Liquid and theme templates.
- [Theme Gem][2]: Run the command line for a more intimate way of managing your theme files.
- [Theme Kit][7]: Next generation tool for syncing theme files. Currently in beta.
- [Liquid Tag Cheat Sheet][4]
- [Retail Tours][5]: Sign up for a workshop in a city near you to learn all things Shopify.
- Need more help? Ask a question in our [Design Forums][6].

License
---------------------
Timber is released under the [MIT License](LICENSE).

[1]: http://docs.shopify.com/themes
[2]: https://github.com/Shopify/shopify_theme
[3]: http://apps.shopify.com/desktop-theme-editor
[4]: http://cheat.markdunkley.com
[5]: https://www.shopify.com/retailtour
[6]: http://ecommerce.shopify.com/c/ecommerce-design
[7]: https://github.com/Shopify/themekit
