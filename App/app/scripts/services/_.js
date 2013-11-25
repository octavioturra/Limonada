'use strict';

angular.module('ngUnderscore', [])
    .factory('_', function () {
        return window._;
    });