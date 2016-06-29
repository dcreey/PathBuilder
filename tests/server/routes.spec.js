/**
 * Created by dcreey on 6/1/2016.
 */

'use strict';

var request = require('request');
var should = require('should');

var url = process.env.HOST;

describe('Routing', function() {
    this.timeout(10000);

    it('should return index.html', (done) => {
        request(url, (err, response, body) => {
            if (err) done(err);

            // this is should.js syntax, very clear
            response.statusCode.should.equal(200);
            done();
        });
    })

    it('should return a route', (done) => {
        request.get((url + '/api/routetest'), {timeout: 10500}, (err, response, body) => {
            if (err) done(err);

            var payload = JSON.parse(body);

            response.statusCode.should.equal(200);
            payload.waysInRoute.length.should.greaterThan(0);

            done();
        });
    })
})