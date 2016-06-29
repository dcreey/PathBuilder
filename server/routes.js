/**
 * Created by dcreey on 5/25/2016.
 */
'use strict';

require('rootpath')();

var gydoModule = require('server/gydo');

module.exports = function(app) {
    app.get("/api/routetest", function(req,res){

        var firstCoorLat1 = 41.9180192;
        var firstCoorLon1 = -87.6409455;
        var secondCoorLat1 = 41.9182619;
        var secondCoorLon1 = -87.641197;
        var gydo = new gydoModule(firstCoorLat1, firstCoorLon1, secondCoorLat1, secondCoorLon1, 5000);
        gydo.getRoute().then((Route)=>{
            res.json(Route);
        })
    });

    app.get("/api/route", function(req,res){
        var firstCoorLat1 = parseFloat(req.param("firstcoorlat"));
        var firstCoorLon1 = parseFloat(req.param("firstcoorlon"));
        var secondCoorLat1 = parseFloat(req.param("secondcoorlat"));
        var secondCoorLon1 = parseFloat(req.param("secondcoorlon"));
        var distance = parseInt(req.param("distance", 5000));
        var gydo = new gydoModule(firstCoorLat1, firstCoorLon1, secondCoorLat1, secondCoorLon1, distance);
        gydo.getRoute().then((Route)=>{
            res.json(Route);
        })
    });

    app.get("/api/routecollection", function(req,res){
        var firstCoorLat1 = parseFloat(req.param("firstcoorlat"));
        var firstCoorLon1 = parseFloat(req.param("firstcoorlon"));
        var secondCoorLat1 = parseFloat(req.param("secondcoorlat"));
        var secondCoorLon1 = parseFloat(req.param("secondcoorlon"));
        var distance = parseInt(req.param("distance", 5000));
        var gydo = new gydoModule(firstCoorLat1, firstCoorLon1, secondCoorLat1, secondCoorLon1, distance);
        gydo.stepThroughRoute().then((Route)=>{
            res.json(Route);
        })
    });

    app.get('*', function(req, res) {
        res.sendFile('/index.html', {root: './public'}); // load our public/index.html file
    });
};