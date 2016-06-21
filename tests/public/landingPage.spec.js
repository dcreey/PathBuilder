/**
 * Created by dcreey on 5/25/2016.
 */

describe('landingPageCtrl', function() {
    beforeEach(window.angular.mock.module('app'));

    var scope, ctrl;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();

        ctrl = $controller('landingPageCtrl', {
            $scope: scope
        });
    }));

    it('should expose some global scope', function() {
        expect(scope).toBeTruthy();
    });

    it('should expose photonSiteLink', function() {
        expect(ctrl.photonSiteLink).toBeTruthy();
    });
});
