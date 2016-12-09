'use strict';

var gulp = require('gulp');
var sync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var KarmaServer = require('karma').Server;

// the paths to local app files
var paths = {
	scripts: ['client/app/**/*.js'],
	html: ['client/app/**/*.html', 'client/*.html'],
	styles: ['client/styles/style.css'],
	test: ['specs/**/*.js']
}

/**
 * Any changes made to client side
 * code will automatically refresh page
 * with new changes
 */
gulp.task('start', ['serve'], function () {
  sync({
    notify: true,
    injectChanges: true,
    files: paths.scripts.concat(paths.html, paths.styles),
    proxy: 'localhost:8000/'
  });
});

/**
 * Run test once and exit
 */
gulp.task('karma', (done) => {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('test', (done) => {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('serve', function () {
  nodemon({
    script: 'index.js',
  })
})

gulp.task('default', ['start', 'test'])