// Karma configuration
// Generated on Thu May 26 2016 20:52:43 GMT-0500 (Central Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      'public/bower_components/jquery/dist/jquery.js',
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-ui-router/release/angular-ui-router.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/app.js',
      'public/controllers/*.js',
      'public/**/*.html',
      'public/*.html',
      'tests/public/*.spec.js',
    ],


    // list of files to exclude
    exclude: [
    ],

    preprocessors: {
      // source files that you want to generate coverage for
      // do not include tests or libraries
      'public/controllers/*.js': ['coverage'],
      'public/*.js': ['coverage'],

      //html source files you want available for testing templates
      'public/**/*.html': ['ng-html2js'],
      'public/*.html': ['ng-html2js'],

      //test case source files - permits npm require to be called from browser object
      'tests/**/*.spec.js' : ['browserify']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'public',
      // create a single module that contains templates from all the files
      moduleName: 'templates'
    },

    reporters: ['coverage'],

    coverageReporter: {
      type : 'html',
      // output coverage reports
      dir : 'coverage/'
    },

    client:{captureConsole: true},


    // web server port
    port: 3000,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
