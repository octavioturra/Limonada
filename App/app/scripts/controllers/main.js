'use strict';

angular.module('limonadaApp')
    .controller('MainCtrl', function ($scope, chData, _, $routeParams) {
        $scope.data = [];
        chData.reload();
    });