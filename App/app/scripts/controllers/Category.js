'use strict';

angular.module('limonadaApp')
    .controller('CategoryCtrl', function ($scope, chData, _, $route) {
        $scope.key = $route.current.params["key"];
        chData.reload();
    });