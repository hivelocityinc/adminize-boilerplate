'use strict';

let gulp = require('gulp');
let prettify = require('gulp-prettify');
let exec = require('child_process').exec;

gulp.task('serve', (cb) => {
  exec('./node_modules/.bin/harp server --port 5000', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('compile', (cb) => {
  exec('./node_modules/.bin/harp compile jade html', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('prettify', ['compile'], () => {
  return gulp.src('html/*.html')
    .pipe(prettify())
    .pipe(gulp.dest('html'));
});

gulp.task('default', ['serve']);
