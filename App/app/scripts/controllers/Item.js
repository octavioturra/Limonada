'use strict';

angular.module('limonadaApp')
    .controller('ItemCtrl', function ($scope, chData, _, $route) {
        var key = $route.current.params["key"];
        chData.reload();
        
        _.subscribe('data.loaded', function(label, data){
            var item = _(data).findWhere({'key': key});
            $scope.item = item;
            $scope.$digest();
        });
    });