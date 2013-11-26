'use strict';

describe('Directive: chSubscribe', function () {

  // load the directive's module
  beforeEach(module('limonadaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ch-subscribe></ch-subscribe>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the chSubscribe directive');
  }));
});
