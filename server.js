/**
 * Created by dcreey on 5/25/2016.
 */
"use strict";

var express = require("express");

var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");

var config = require('./config/' + (process.env.NODE_ENV || 'development'));

var port = config.port || 3001;
process.env.PORT = port;

process.env.HOST = config.hostname;

var path = require('path');

global.appRoot = path.resolve(__dirname);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

require("./server/routes");
//require('./server/routes')(app);

mongoose.connect(config.db);

app.listen(port);

exports = module.exports = app;

/*
function requireRoutes(){
    require("fs").readdirSync('./modules').forEach(function(file) {
        require("./modules/" + file+ "/server/route")(app);
    });
}*/
