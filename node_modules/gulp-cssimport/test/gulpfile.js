var gulp = require("gulp"),
	plugin = require("..");

gulp.task("fixture2", function() {
	gulp.src("fixture2/*")
		.pipe(plugin())
		.pipe(gulp.dest("./fixture2_dest/"));
});

gulp.task("fixture3", function() {
	gulp.src("fixture3/*")
		.pipe(plugin())
		.pipe(gulp.dest("./fixture3_dest/"));
});

gulp.task("fixture4", function() {
	gulp.src("fixture4/*")
		.pipe(plugin())
		.pipe(gulp.dest("./fixture4_dest/"));
});

gulp.task("fixture5", function() {
	gulp.src("fixture5/*")
		.pipe(plugin())
		.pipe(gulp.dest("./fixture5_dest/"));
});

