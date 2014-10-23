gulp-cssimport
==============

Parses css files, finds `@import` directive and includes these files.

USAGE
-----
```javascript
var gulp = require("gulp");
var cssimport = require("gulp-cssimport");

gulp.task("import", function() {
	gulp.src("src/*.css")
		.pipe(cssimport())
		.pipe(gulp.dest("dist/"));
}); 
```

KNOWN ISSUES
------------
1. Cannot process minified files
2. Cannot process urls [fixed in v1.2]

CHANGELOG
---------
1.0 [12 Feb 2014]
- first release

1.1 [15 Feb 2014]
- switched to through2
- process files asynchronously

1.2 [15 Feb 2014]
- fixed processing urls