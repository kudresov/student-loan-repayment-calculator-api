'use strict';

var mocha = require('gulp-mocha');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('test', function() {
  return gulp.src(['lib/**/*spec.js'], {read: false})
             .pipe(mocha({ reporter: 'list' }))
             .on('error', gutil.log);
});

gulp.task('test:auto', function() {
  gulp.watch('lib/**/*.js', ['test']);
});