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
            .otherwise({
                redirectTo: '/'
            });

    })
    .run(function (Datamon, _, chData) {
        _.globals('DATA_URL', 'data/data.json');
        chData.start(_.globals('DATA_URL'));
        //Datamon.start(function (d) {});
    });

window.addEventListener('load', function () {
    _.publish('app.ready', {
        loaded: true
    });
})