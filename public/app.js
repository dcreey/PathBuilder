/**
 * Created by dcreey on 5/25/2016.
 */

var app = angular.module("app", ['ui.router'])

    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.baseUrl = "http://127.0.0.1:3001";
            }]
    );
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/landingPage.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html'
        });

});

app.directive('header', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: "/views/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    }
});

app.directive('footer', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: "/views/footer.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    }
});

app.controller("appCtrl", function($http){



    var app = this;
})