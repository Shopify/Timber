Shopify Timber Documentation
=====================

####[View documentation](http://www.shopify.com/timber)

Timber's documentation is build with [Jekyll](http://jekyllrb.com/) and [Sass](http://sass-lang.com/) and hosted on [GitHub Pages](http://pages.github.com/).

Bugs and Feedback
--
Please note all bugs and feedback about the theme *and* docs in [issues](https://github.com/Shopify/Timber/issues).

Run Documentation Locally
--
To run the documentation locally, follow these steps:

1. Clone this branch or [download the zip](https://github.com/Shopify/Timber/archive/gh-pages.zip) and navigate to the folder in terminal
2. Install Jekyll: `gem install jekyll`
3. Install Sass: `gem install sass`
    * Use `sass -v` to make sure it worked
4. Install Compass: `gem install compass`
5. Setup dependencies `bundle install`
6. Run `bundle exec jekyll serve --watch`
7. In another terminal window, run `compass watch`
8. Access the docs at `http://localhost:4000`

### Notes about local build
- `jekyll serve --watch` will compile the Jekyll and Sass files into static assets in the **_site** folder each time a file is saved. That folder is excluded from the repo.
- `compass watch` will update ie.css and main.css.
- Use `rake build` to manually parse SCSS files.
- There is no easy way to use Jekyll plugins with GitHub pages, so none are used here.


Dependencies (all included)
--
- **[Modernizr](http://modernizr.com/)**: (javascripts/lib/modernizer.min.js)
- **[Waypoints.js](https://github.com/imakewebthings/jquery-waypoints)** (javascripts/lib/waypoints.js)
- **[Bourbon](http://bourbon.io/)** (css/libs/bourbon)
