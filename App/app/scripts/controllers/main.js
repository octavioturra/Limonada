'use strict';

angular.module('limonadaApp')
    .controller('MainCtrl', function ($scope, Datamon, _, $routeParams) {
        $scope.datamon = Datamon;
        $scope.items = [];

        _.subscribe('data.loaded', function (key, d) {
            $scope.items = d;
            $scope.$digest();
        });

        $scope.listItens = function () {

        };
        $scope.findItens = function () {

        };
        $scope.lastItens = function () {

        };
        $scope.newItens = function () {

        };
    });