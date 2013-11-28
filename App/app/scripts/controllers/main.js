'use strict';

angular.module('limonadaApp')
    .controller('MainCtrl', function ($scope, chData, _, $routeParams) {
        $scope.data = [];
        chData.reload();
        
        _.subscribe('data.loaded', function(key, d){
            if(d===null){
                
            }
            var categories = _.pluck(d, 'category');
            $scope.categories = _.uniq(categories);
            $scope.$digest();
        });
        
        $scope.snapOpts = {
          disable: 'right',
          addBodyClasses : 'snapped',
          minPosition :'8px'
        };
    });