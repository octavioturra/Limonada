'use strict';

angular.module('limonadaApp')
    .controller('MainCtrl', function ($scope, chData, _, $routeParams, snapRemote) {
        $scope.data = [];
        chData.reload();
		snapRemote.close();
    });