/**
 * Created by dcreey on 5/25/2016.
 */

describe('Website States - app.js', () => {
    beforeEach(window.angular.mock.module('app'));
    beforeEach(window.angular.mock.module('templates'));

    var scope, state, injector, ctrl, templateCache, compile, httpBackend;

    beforeEach(inject(($controller, $rootScope, $state, $injector, $templateCache, $compile, $httpBackend) => {
        scope = $rootScope.$new();

        ctrl = $controller('appCtrl', {
            $scope: scope
        });
        state = $state;
        injector = $injector;
        templateCache = $templateCache;
        compile = $compile;
        httpBackend = $httpBackend;
    }));

    it('should expose some global scope', () => {
        expect(scope).toBeTruthy();
    })

    it('should respond to landingPage URL', () => {
        templateCache.put('html/landingPage.html', '');
        expect(state.href('home')).toEqual('#/home');
    });

    it('should respond to about URL', () => {
        templateCache.put('html/about.html', '');
        expect(state.href('about')).toEqual('#/about');
    });

    it('should create header directive', () => {
        header = compile(angular.element('<div header/>'))(scope);
        scope.$digest();
        expect(header[0].className).toContain('navbar');
    })

    it('should create footer directive', () => {
        templateCache.put('html/footer.html', '');
        footer = compile(angular.element('<div footer/>'))(scope);
        scope.$digest();
        expect(footer[0].getAttribute("footer")).toEqual('');
    })
});