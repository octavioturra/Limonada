'use strict';

angular.module('limonadaApp', [
    //'ngCookies',
    'ngResource',
    //'ngSanitize',
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'underscore',
    'channelData',
    'snap'
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
            .when('/about', {
              templateUrl: 'views/about.html',
              controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

    })
    .run(function (_, chData) {
        _.globals('DATA_URL', 'data/data.json');
        chData.start(_.globals('DATA_URL'));
    });

window.addEventListener('load', function () {
    _.publish('app.ready', {
        loaded: true
    });
});