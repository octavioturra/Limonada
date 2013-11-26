'use strict';

describe('Service: Chhttp', function () {

  // load the service's module
  beforeEach(module('limonadaApp'));

  // instantiate service
  var Chhttp;
  beforeEach(inject(function (_Chhttp_) {
    Chhttp = _Chhttp_;
  }));

  it('should do something', function () {
    expect(!!Chhttp).toBe(true);
  });

});
