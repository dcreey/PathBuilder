/**
 * Created by dcreey on 6/1/2016.
 * Modified version of MEAN.io test.js
 */
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    request = require('request'),
    karmaServer = require('karma').Server;
var plugins = gulpLoadPlugins();

process.env.NODE_ENV = 'test';

gulp.task('test', ['startServer', 'stopServer']);
gulp.task('startServer', function(done) {
    var promise = require('../server.js');

    done();
});
gulp.task('stopServer', ['runKarma'], function() {
    process.exit();
});
gulp.task('runMocha', ['startServer'], function () {
    return gulp.src('./tests/server/*.spec.js', {read: false})
        .pipe(plugins.mocha({
            reporter: 'spec'
        }))
        .on('error', function(error){
            console.error(error);
            this.emit('end');
        });
});
gulp.task('runKarma', ['runMocha'], function (done) {
    var karma = new karmaServer({
        configFile: __dirname + '/../karma.conf.js',
        singleRun: true
    }, function () {
        done();
    });

    karma.start();
});