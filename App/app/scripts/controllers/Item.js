'use strict';

angular.module('limonadaApp')
    .controller('ItemCtrl', function ($scope, Datamon, _, $route) {
        var key = $route.current.params["key"];
        Datamon.reload(function(){});
        _.subscribe('data.loaded', function(label, data){
            var item = _(data).findWhere({'key': key});
            $scope.item = item;
            console.log(key, item);
            $scope.$digest();
        });
    });