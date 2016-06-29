/**
 * Created by dcreey on 6/20/2016.
 */
"use strict";

var routeDatabaseInstance = require("gydorouting/DatabaseAccess/RouteDatabaseInstance");
var routeBuilder = require('gydorouting/RouteBuilding/RouteBuilder');
var routeCollectionBuilder = require('gydorouting/RouteBuilding/RouteCollectionBuilder');
var routeParameter = require("gydorouting/RouteParameters/RouteParameters");
var routeCoordinate = require('gydorouting/RouteParameters/RouteCoordinate');

function Gydo(firstCoorLat, firstCoorLon, secondCoorLat, secondCoorLon, distance) {
    this.firstStartCoord = new routeCoordinate.RouteCoordinate(firstCoorLat, firstCoorLon);
    this.secondStartCoord = new routeCoordinate.RouteCoordinate(secondCoorLat, secondCoorLon);
    this.endCoord = new routeCoordinate.RouteCoordinate(firstCoorLat, firstCoorLon);
    this.distance = distance || 5000;
}

Gydo.prototype = {
    getRoute: function() {
        var routeParameters = new routeParameter.RouteParameters(this.firstStartCoord, this.secondStartCoord, this.endCoord, this.distance);
        var testRouteBuilder = new routeBuilder.RouteBuilder(routeParameters, routeDatabaseInstance);

        return new Promise((res, rej) => {
            testRouteBuilder.buildRoute(function (err, Route) {
                if (err) rej();
                else res(Route);
            })
        })
    },
    stepThroughRoute: function(){
        var routeCollection = [];
        var routeParameters = new routeParameter.RouteParameters(this.firstStartCoord, this.secondStartCoord, this.endCoord, this.distance);
        var testRouteBuilder = new routeCollectionBuilder.RouteBuilder(routeParameters, routeDatabaseInstance);

        return new Promise((res, rej) => {
            testRouteBuilder.buildRoute(function (err, Route) {
                if (err) rej();
                else res(Route);
            })
        })
    }
}

module.exports = Gydo;
