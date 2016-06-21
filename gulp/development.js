/**
 * Created by dcreey on 6/5/2016.
 * Based on MEAN.io development.js file
 */
'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    through = require('through'),
    plugins = gulpLoadPlugins();

/*var defaultTasks = ['clean', 'jshint', 'less', 'csslint', 'devServe', 'watch'];*/
var defaultTasks = ['devServe', 'watch'];

gulp.task('env:development', function () {
    process.env.NODE_ENV = 'development';
});

gulp.task('devServe', ['env:development'], function () {
    plugins.nodemon({
        script: 'server.js',
        ext: 'html js',
        env: { 'NODE_ENV': 'development' } ,
        ignore: [
            'node_modules/',
            'logs/',
            'packages/*/*/public/assets/lib/',
            'packages/*/*/node_modules/',
            '.bower-*',
            '**/.bower-*',
            '**/tests'
        ],
        nodeArgs: ['--debug'],
        stdout: false
    }).on('readable', function() {
        this.stdout.on('data', function(chunk) {
            if(/App started/.test(chunk)) {
                setTimeout(function() { plugins.livereload.reload(); }, 500);
            }
            process.stdout.write(chunk);
        });
        this.stderr.pipe(process.stderr);
    });
});

gulp.task('watch', function () {
    plugins.livereload.listen({interval: 500});
})

gulp.task('development', defaultTasks);
