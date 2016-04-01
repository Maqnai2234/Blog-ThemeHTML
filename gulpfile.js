/*
* Dependencias
*/

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');
    gulpif = require('gulp-if');

var livereload = false;

// Compila Styl a CSS
gulp.task('stylus', function () {
  gulp.src('./assets/stylus/style.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(gulpif(livereload, connect.reload()))
});

//Reload cuando cambia un archivo html

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

//Levantar servidor con livereload
gulp.task('connect', function () {
  connect.server({
    root: '.',
    hostname: '0.0.0.0',
    port: 9000,
    livereload: true
  });
  livereload = true;
})


//Gulp Watch
gulp.task('watch', function() {
  gulp.watch('./assets/stylus/*.styl', ['stylus']);
  gulp.watch(['./*.html'], ['html']);
})

//Default gulp

gulp.task('default', ['connect', 'watch']);
