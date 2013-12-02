'use strict';

angular.module('limonadaApp')
    .controller('CategoryCtrl', function ($scope, chData, _, $route) {
        chData.reload();
         _.subscribe('data.loaded', function(key, d){
            if(d===null){
                
            }
            var categories = _.pluck(d, 'category');
            $scope.categories = _.uniq(categories);
            $scope.$digest();
        });
    });