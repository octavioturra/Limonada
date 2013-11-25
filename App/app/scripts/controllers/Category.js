'use strict';

angular.module('limonadaApp')
    .controller('CategoryCtrl', function ($scope, Datamon, _, $route) {
        var key = $route.current.params["key"];
        Datamon.reload(function(){});
        _.subscribe('data.loaded', function(label, data){
            var items = _(data).where({'category': key});
            $scope.items = items;
            console.log(key, items);
            $scope.$digest();
        });
    });