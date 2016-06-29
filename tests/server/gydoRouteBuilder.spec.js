/**
 * Created by dcreey on 6/20/2016.
 */

'use strict';

var firstCoorLat1 = 41.9180192;
var firstCoorLon1 = -87.6409455;
var secondCoorLat1 = 41.9182619;
var secondCoorLon1 = -87.641197;

require('rootpath')();
var should = require('should');
var gydoM = require('server/gydo');
var gydo;

beforeEach((done)=>{
    gydo = new gydoM(firstCoorLat1, firstCoorLon1, secondCoorLat1, secondCoorLon1, 5000);
    done();
})

describe('Routing', function() {
    this.timeout(20000);
    it('should return route', (done) => {
        gydo.getRoute().then((Route)=>{
            should.exist(Route);
            done();
        })
    })
    it('should return route', (done) => {
        gydo.stepThroughRoute().then((Route)=>{
            should.exist(Route);
            done();
        })
    })
})