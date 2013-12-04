'use strict';

angular.module('limonadaApp')
    .controller('ContainerCtrl', function ($scope) {
        $scope.snapOpts = {
            disable: 'right',
            addBodyClasses: 'snapped',
            minPosition: '8px'
        };
    });