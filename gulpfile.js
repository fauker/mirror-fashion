var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  usemin = require('gulp-usemin'),
  cssmin = require('gulp-cssmin'),
  browserSync = require('browser-sync'),
  jshint = require('gulp-jshint'),
  csslint = require('gulp-csslint'),
  jshintSstylish = require('jshint-stylish'),
  autoprefixer = require('gulp-autoprefixer'),
  less = require('gulp-less');
 
// Tarefa padrão
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
			css: [autoprefixer, cssmin]
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

	gulp.watch('src/js/*.js').on('change', function(event) {
		console.log('Linting ' + event.path)
		gulp.src(event.path)
			.pipe(jshint())
			.pipe(jshint.reporter(jshintSstylish));
	});

	gulp.watch('src/css/*.css').on('change', function(event) {
		console.log('Hinting ' + event.path)
		gulp.src(event.path)
			.pipe(jshint())
			.pipe(jshint.reporter(jshintSstylish));
	});

	gulp.watch('src/less/*.less').on('change', function(event) {
		console.log('Complindo LESS -> Arquivo: ' + event.path)
		gulp.src(event.path)
			.pipe(less().on('error', function(error) {
				console.log('Deu erro de compilação');
				console.log(error.message);
			}))
			.pipe(gulp.dest('src/css'));
	});	

	gulp.watch('src/**/*').on('change', browserSync.reload);
});