'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

function err(error) {
	console.error('[ERROR]'.red + error.message);
	this.emit('end');
}

gulp.task('scss', function () {
  return gulp.src(['./src/**/**/*.scss', '!src/style/**/*.scss'])
    .pipe(plumber(err))
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(rename(function (path) {
      path.extname = ".acss";
    }))
    .pipe(gulp.dest('./src'));
});

gulp.task('watch', [], function() {
  gulp.watch('./src/**/*.scss', ['scss']);
});