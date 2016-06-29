/**
 * Created by dcreey on 6/21/2016.
 */
'use strict';

app.controller('routeVisualizerCtrl', function($scope,$http){
    var route = this;
    route.overlayDots;
    route.overlayLines;
    route.builtRoute = null;
    route.collection = [];
    route.currentCollectionIndex = 1;
    route.firstcoor = {lat:41.912, lon:-87.640};
    route.secondcoor = {lat:41.918, lon:-87.640};

    route.loadTestRoute = function(){
        var startTime = new Date().getTime();
        $http.get("/api/routetest").success(function (builtRoute) {
            route.timeOfRequest = new Date().getTime() - startTime;
            route.collection.push(builtRoute);
            appendRouteToMap();
        });
    }

    route.loadCustomRoute = function(){
        var startTime = new Date().getTime();
        $http({
            url: "/api/route",
            method: "GET",
            params: {
                firstcoorlat: route.firstcoor.lat,
                firstcoorlon: route.firstcoor.lon,
                secondcoorlat: route.secondcoor.lat,
                secondcoorlon: route.secondcoor.lon,
                distance: route.distance
            }
        }).then(function successCallback(builtRoute) {
            route.timeOfRequest = new Date().getTime() - startTime;
            route.collection.push(builtRoute);
            appendRouteToMap();
        }, function errorCallback(response) {
            route.timeOfRequest = new Date().getTime() - startTime;
            alert(response.data);
        });
    }

    route.loadCustomRouteAndStepThrough = function(){
        var startTime = new Date().getTime();
        $http({
            url: "/api/routecollection",
            method: "GET",
            params: {
                firstcoorlat: route.firstcoor.lat,
                firstcoorlon: route.firstcoor.lon,
                secondcoorlat: route.secondcoor.lat,
                secondcoorlon: route.secondcoor.lon,
                distance: route.distance
            }
        }).then(function successCallback(builtRoutes) {
            route.timeOfRequest = new Date().getTime() - startTime;
            route.currentCollectionIndex = 1;
            route.collection = builtRoutes.data;
            appendRouteToMap();
        }, function errorCallback(response) {
            route.timeOfRequest = new Date().getTime() - startTime;
            alert(response.data);
        });
    }

    route.onIndexChanged = function(){
        if (route.currentCollectionIndex < 1) route.currentCollectionIndex = 1;
        if (route.currentCollectionIndex >= route.collection.length) route.currentCollectionIndex = route.collection.length;
        appendNewRoute();
    }

    route.priorStepInCollection = function(){
        route.currentCollectionIndex -= 1;
        appendNewRoute();
    }

    route.nextStepInCollection = function(){
        route.currentCollectionIndex += 1;
        appendNewRoute();
    }

    route.resetMapForNewRoute = function(){
        removeRouteFromMap();
        resetRouteData();
    }

    route.goToEnd = function(){
        route.currentCollectionIndex = route.collection.length;
        appendNewRoute();
    }

    route.goToStart = function(){
        route.currentCollectionIndex = 1;
        appendNewRoute();
    }

    route.isRouteBuilt = function(){
        return route.collection.length != 0;
    }

    route.hidePagination = function(){
        return route.collection.length <= 1;
    }
    route.isAtEnd = function(){
        return route.collection.length == route.currentCollectionIndex;
    }

    route.isAtBeginning = function(){
        return 1 == route.currentCollectionIndex;
    }


    function appendNewRoute(){
        removeRouteFromMap();
        appendRouteToMap();
    }

    function removeRouteFromMap(){
        route.overlayDots.setMap(null);
        route.overlayLines.setMap(null);
    }

    function resetRouteData(){
        route.builtRoute = null;
        route.collection = [];
        route.currentCollectionIndex = 0;
        route.markerOne.setMap(null);
        route.markerTwo.setMap(null);
        route.map.unbindAll();
        d3.select("#map").remove();
        d3.select("#route").insert("div",".row.text-center").attr("id","map");
        initializeMap();
    }

    function appendRouteToMap(){
        var builtRoute = route.collection[route.currentCollectionIndex - 1];
        var routes = builtRoute.waysInRoute || builtRoute.data.waysInRoute;
        if (!route.collection[route.currentCollectionIndex - 1].isSpliced)
            if (route.currentCollectionIndex !== route.collection.length && routes.length > 1) {
                routes.splice(-1, 1);
                route.collection[route.currentCollectionIndex - 1].isSpliced = true;
            }
        var result = routes.reduce(function(res, obj) {
            res.push.apply(res, obj.nodes.map(function(val) {
                return {"key":obj.wayName, "lat":val.lat, "lon":val.lon};
            }));
            return res;
        }, []);
        route.builtRoute = result;

        createD3Overlay();
        createD3LinesOverlay();
    }

    function createD3Overlay(){
        route.overlayDots = new google.maps.OverlayView();
        var data = route.builtRoute;

        route.overlayDots.onRemove = function(){
            this.layer.remove();
        }

        // Add the container when the overlay is added to the map.
        route.overlayDots.onAdd = function() {
            this.layer = d3.select(this.getPanes().overlayLayer).append("div")
                .attr("class", "stations");
            this.layer[0][0].parentNode.style.zIndex = 1000;
            this.layer[0][0].parentNode.parentNode.style.zIndex = 1000;
            this.layer[0][0].parentNode.parentNode.parentNode.style.zIndex = 1000;
            // Draw each marker as a separate SVG element.
            // We could use a single SVG, but what size would it have?
            route.overlayDots.draw = function() {
                var projection = this.getProjection(),
                    padding = 5;

                var marker = this.layer.selectAll("svg")
                    .data(data)
                    .each(transform) // update existing markers
                    .enter().append("svg")
                    .each(transform)
                    .attr("class", "marker");
                this.layer.selectAll(".marker")
                    .on("mouseenter", function(d, i) {
                        d3.select(this).append("text")
                            .text(i)
                            .attr("x", 20)
                            .attr("y", 14)
                    })
                    .on("mouseout", function() {
                        d3.select(this).selectAll("text").transition().delay(100).remove();
                    });

                // Add a circle.
                marker.append("circle")
                    .attr("r", 4.5)
                    .attr("cx", padding)
                    .attr("cy", padding);

                function transform(d) {
                    d = new google.maps.LatLng(d.lat, d.lon);
                    d = projection.fromLatLngToDivPixel(d);
                    return d3.select(this)
                    .style("left", (d.x - padding) + "px")
                    .style("top", (d.y - padding) + "px");
                }
                function transformCoor(d){
                    d = new google.maps.LatLng(d.lat, d.lon);
                    return projection.fromLatLngToDivPixel(d);
                }
            };
        };

        // Bind our overlay to the map…
        route.overlayDots.setMap(route.map);
    }

    function createD3LinesOverlay(){
        route.overlayLines = new google.maps.OverlayView();
        var data = route.builtRoute;

        route.overlayLines.onRemove = function(){
            this.layer.remove();
        }

        // Add the container when the overlay is added to the map.
        route.overlayLines.onAdd = function() {
            this.layer = d3.select(this.getPanes().overlayLayer).append("div")
                .attr("class", "lines");

            // Draw each marker as a separate SVG element.
            // We could use a single SVG, but what size would it have?
            route.overlayLines.draw = function() {
                //first remove any old lines - used when rebuilding on zoom
                this.layer.select("svg").remove();

                var projection = this.getProjection(),
                    padding = 5;

                var lineFn = d3.svg.line()
                    .x(function (d) {
                        return transformCoor(d).x;
                    })
                    .y(function (d) {
                        return transformCoor(d).y;
                    });

                var svgPos = transformCoor(
                    {
                        lat:Math.max.apply(Math, data.map(function(x){return x.lat;})),
                        lon:Math.min.apply(Math, data.map(function(x){return x.lon;}))
                    }
                )

                var svgContainer = this.layer.append("svg")
                    .attr("width", 200)
                    .attr("height", 200);
                    /*.style("left", (svgPos.x - padding) + "px")
                    .style("top", (svgPos.y - padding) + "px");*/

                var lineGraph = svgContainer.append("path")
                    .attr("d", lineFn(data));

                function transform(d) {
                    d = transformCoor(d);
                    return d3.select(this)
                        .style("left", (d.x - padding) + "px")
                        .style("top", (d.y - padding) + "px");
                }
                function transformCoor(d){
                    d = new google.maps.LatLng(d.lat, d.lon);
                    return projection.fromLatLngToDivPixel(d);
                }
            };
        };

        // Bind our overlay to the map…
        route.overlayLines.setMap(route.map);
    }

    function initializeMap(){
        createGoogleMap();
        createMarkers();
    }

    function createGoogleMap(){
        route.map = new google.maps.Map(d3.select("#map").node(), {
            zoom: 15,
            center: new google.maps.LatLng(route.firstcoor.lat, route.firstcoor.lon),
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            scaleControl: true
        });
    }

    function createMarkers(){
        route.markerOne = new google.maps.Marker({
            position: {lat:route.firstcoor.lat, lng:route.firstcoor.lon},
            map: route.map,
            title: 'Start Position',
            draggable:true
        });
        route.markerTwo = new google.maps.Marker({
            position: {lat:route.secondcoor.lat, lng:route.secondcoor.lon},
            map: route.map,
            title: 'Second Position',
            draggable:true
        });
        google.maps.event.addListener(route.markerOne, 'dragend', function() {
            setCoordinate1Value(route.markerOne.getPosition());
        });
        google.maps.event.addListener(route.markerTwo, 'dragend', function() {
            setCoordinate2Value(route.markerTwo.getPosition());
        });
    }

    function setCoordinate1Value(pos){
        route.firstcoor = {lat:pos.lat(), lon:pos.lng()};
    }
    function setCoordinate2Value(pos){
        route.secondcoor = {lat:pos.lat(), lon:pos.lng()};
    }

    initializeMap();
});