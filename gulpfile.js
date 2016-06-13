'use strict';

let gulp = require('gulp');
let prettify = require('gulp-prettify');
let rimraf = require('rimraf');
let exec = require('child_process').exec;

gulp.task('bower:install', (cb) => {
  myExec('./node_modules/.bin/bower install', (cb));
});

gulp.task('bower:clean', (cb) => {
  rimraf('./src/bower_components', cb);
});

gulp.task('serve', ['bower:install'], (cb) => {
  myExec('./node_modules/.bin/harp server src --port 5000', (cb));
});

gulp.task('compile', ['bower:clean'], (cb) => {
  myExec('./node_modules/.bin/harp compile src dist && cp ./bower.json ./dist', (cb));
});

gulp.task('build', ['compile'], () => {
  return gulp.src('dist/*.html')
    .pipe(prettify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['serve']);


function myExec(command, cb) {
  exec(command, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
};
