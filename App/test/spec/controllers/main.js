'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('limonadaApp'));

    var MainCtrl,
        scope,
        http;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ItemCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));
});