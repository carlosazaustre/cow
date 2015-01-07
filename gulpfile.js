"use strict";

var gulp    = require("gulp");
var mocha   = require("gulp-mocha");
var jshint  = require("gulp-jshint");

// -- Tasks --------------------------------------------------------------------
gulp.task('lint', function() {
  gulp.src([ 'gulpfile.js', 'index.js', './lib/**/*.js' ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
  return gulp.src('./test/*.js', { read: false })
    .pipe(mocha({
      reporter  : 'spec',
      globals: {
        chai    : require('chai'),
        expect  : require('chai').expect
      }
    }).on('error', _handleError));
});

gulp.task('watch', function() {
  gulp.watch([ './test/*.js', './lib/**/*.js' ], [ 'test', 'lint' ]);
});

// -- Functions ----------------------------------------------------------------
gulp.task('default', ['watch']);

// -- Helpers ------------------------------------------------------------------
function _handleError(err) {
  // Don't show Gulp errors
  this.emit('end');
}
