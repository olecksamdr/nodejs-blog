var gulp = require("gulp"),
	cssimport = require("gulp-cssimport"),
	cssnano = require('gulp-cssnano'),
	rjs = require('gulp-requirejs'),
	uglify = require('gulp-uglify');
	// source = require('vinyl-source-stream'),

var options = {
	extensions: ["css"] // process only css 
};

gulp.task('import', function() {
	return gulp.src('./public/dev_css/*.css')
		.pipe(cssimport(options))
		.pipe(cssnano())
		.pipe(gulp.dest('public/css/*.css'));
});

// build js for editArticle
gulp.task('eA_js', function (cb) {
	rjs({
		name: 'editArticle',
		baseUrl: './public/js/',
		out: 'editArticle.js'
		})
		.pipe(uglify())
		.pipe(gulp.dest('./public/js/build'));

		cb();
});

// build js for edit_remove 
gulp.task('eR_js', function (cb) {
	rjs({
		name: 'edit_remove',
		baseUrl: './public/js/',
		out: 'edit_remove.js'
		})
		.pipe(uglify())
		.pipe(gulp.dest('./public/js/build'));

		cb();
});

// build js for newArticle 
gulp.task('nA_js', function (cb) {
	rjs({
		name: 'newArticle',
		baseUrl: './public/js/',
		out: 'newArticle.js'
		})
		.pipe(uglify())
		.pipe(gulp.dest('./public/js/build'));

		cb();
});

gulp.task('buildJS', gulp.series(['eA_js', 'eR_js', 'nA_js']))

gulp.task('default', gulp.series('import'));