'use strict';

angular.module('limonadaApp', [
  //'ngCookies',
  'ngResource',
  //'ngSanitize',
  'ngRoute',
  'ngUnderscore'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/category/:key', {
                templateUrl: 'views/main.html',
                controller: 'CategoryCtrl'
            })
            .when('/item/:key', {
                templateUrl: 'views/Item.html',
                controller: 'ItemCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        
    }).run(function (Datamon) {
        Datamon.start(function (d) {});
    });