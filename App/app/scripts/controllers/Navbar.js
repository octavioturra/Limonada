'use strict';

angular.module('limonadaApp')
    .controller('NavbarCtrl', function ($scope) {
        $scope.categories = [];
        _.subscribe('data.loaded', function(key, d){
            if(d===null){
                
            }
            var categories = _.pluck(d, 'category');
            $scope.categories = _.uniq(categories);
            $scope.$digest();
        });
    });