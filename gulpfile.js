/**
 * Created by dcreey on 6/1/2016.
 * Modified version of MEAN.io gulpfile.js
 */
'use strict';

var gulp = require('gulp');

var env = 'test';

require('require-dir')('./gulp');
console.log('Invoking gulp -',env);
gulp.task('default', ['clean'], function (defaultTasks) {
    // run with paramater
    gulp.start(env);
});
