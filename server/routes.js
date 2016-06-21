/**
 * Created by dcreey on 5/25/2016.
 */
'use strict';

var path = require('path');

module.exports = function(app) {
    app.get("/api/route", function(req,res){
        //get route here
    });

    app.get('*', function(req, res) {
        res.sendFile('/index.html', {root: './public'}); // load our public/index.html file
    });
};