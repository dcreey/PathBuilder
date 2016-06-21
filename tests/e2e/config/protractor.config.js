/**
 * Created by dcreey on 6/3/2016.
 * Modified version of MEAN.io protractor.config.js
 */
var jasmineReporters = require('jasmine-reporters');

exports.config = {
    baseUrl: 'http://localhost:3001/index.html',
    framework: 'jasmine2',
    specs: [
        '../tests/*.spec.js',
        '../tests/**/*.spec.js'
    ],
    multiCapabilities: [
        {
            browserName: 'chrome'
        }
    ],

    onPrepare: function(){
        //Creates independent results files for each browser
        //Otherwise they run at the same time and overwrite each other
        /*var capsPromise = browser.getCapabilities();

        return capsPromise.then(function(caps){
            var browserName = caps.caps_.browserName;
            var browserVersion = caps.caps_.version;
            var browserPrefix = browserName + '-' + browserVersion + '-';
            jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
                savePath: 'tests/results/e2e/junit',
                filePrefix: browserPrefix,
                consolidateAll: false
            }));
        });*/
    }
};
