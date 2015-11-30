var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  usemin = require('gulp-usemin'),
  cssmin = require('gulp-cssmin'),
  browserSync = require('browser-sync');

// Função padrão
gulp.task('default', ['copy'], function() {
	gulp.start('build-img', 'usemin');
});

// Copia todos os arquivos da src para a dist
gulp.task('copy', ['clean'], function() {
	return gulp.src('src/**/*')
		.pipe(gulp.dest('dist'));
});

// Apaga a pasta dist
gulp.task('clean', function() {
	return gulp.src('dist')
		.pipe(clean());
});

// Otimiza as imagens do diretório informado
gulp.task('build-img', function() {
	return gulp.src('dist/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

// Minifica CSS e JS e troca o trecho do HTML que faz
// a importação das bibliotecas
gulp.task('usemin', function() {
	 return gulp.src('dist/**/*.html')
		.pipe(usemin({
			js: [uglify],
			css: [cssmin]
		}))
		.pipe(gulp.dest('dist'));
});

// Servidor sincronizado com o browser
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	});

	gulp.watch('src/**/*').on('change', browserSync.reload);
});