'use strict';

angular.module('channelData', ['underscore'])
    .directive('chSubscribe', function () {
        return {
            template: '<div ng-transclude></div>',
            transclude: true,
            link: function postLink(scope, element, attrs) {
                var attr = (attrs.chSubscribe || "").split('|');
                var context = {
                    event: 'broadcast',
                    data: 'data'
                };
                
                if (attr.length == 1) {
                    context.event = attr[0].trim();
                } else if (attr.length == 2) {
                    context.event = attr[0].trim();
                    context.container = attr[1].trim();
                }
                
                _.subscribe(context.event, function (label, d) {
                    scope.label = label;
                    scope[context.data] = d;
                    scope.$digest();
                });
            }
        };
    });