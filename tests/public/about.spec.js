/**
 * Created by dcreey on 5/25/2016.
 */

var testHelper = require('../testHelper');

describe('aboutCtrl', function() {
    beforeEach(window.angular.mock.module('app'));

    var scope, ctrl;

    beforeEach(inject(function($controller, $rootScope, $http) {
        scope = $rootScope.$new();

        ctrl = $controller('aboutCtrl', {
            $scope: scope,
            $http: $http
        });
    }));

    it('should expose some global scope', function() {
        expect(scope).toBeTruthy();
    });

    it('should expose profileLink', function() {
        expect(ctrl.profileLink).toBeTruthy();
    });
});