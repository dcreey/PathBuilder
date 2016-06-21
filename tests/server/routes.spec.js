/**
 * Created by dcreey on 6/1/2016.
 */

'use strict';

var request = require('request');
var should = require('should');

describe('Routing', () => {
    var url = process.env.HOST;
    it('should return index.html', (done) => {
        request(url, function (err, response, body) {
            if (err) done(err);

            // this is should.js syntax, very clear
            //var payload = JSON.parse(body);
            response.statusCode.should.equal(200);
            done();
        });
    })
})