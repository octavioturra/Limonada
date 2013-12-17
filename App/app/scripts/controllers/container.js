'use strict';

angular.module('limonadaApp')
    .controller('ContainerCtrl', function ($scope) {
        $scope.snapOpts = {
            disable: 'right',
            addBodyClasses: true,
			 flickThreshold: 10
        };
    });