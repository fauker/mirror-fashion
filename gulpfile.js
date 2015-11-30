var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  usemin = require('gulp-usemin'),
  cssmin = require('gulp-cssmin'),
  browserSync = require('brower-sync');

gulp.task('default', ['copy'], function() {
	gulp.start('build-img', 'usemin');
});

gulp.task('copy', ['clean'], function() {
	return gulp.src('src/**/*')
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
	return gulp.src('dist')
		.pipe(clean());
});

gulp.task('build-img', function() {
	return gulp.src('dist/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function() {
	 return gulp.src('dist/**/*.html')
		.pipe(usemin({
			js: [uglify],
			css: [cssmin]
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('server', function() {
	browserSync.init({
		baseDir: 'src'
	});

	gulp.whatch('src/**/*').on('change', browserSync.reload);
});