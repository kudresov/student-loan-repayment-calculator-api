'use strict';

var mocha = require('gulp-mocha');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('test', function() {
  return gulp.src(['tests/**/*.js'], {read: false})
             .pipe(mocha({ reporter: 'spec' }))
             .on('error', gutil.log);
});

gulp.task('test:auto', function() {
  gulp.watch(['routes/**/*.js', 'tests/**/*.js', 'lib/**/*.js', 'server.js', 'index.js'], ['test']);
});