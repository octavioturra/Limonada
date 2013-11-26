'use strict';

describe('Service: Chdata', function () {

  // load the service's module
  beforeEach(module('limonadaApp'));

  // instantiate service
  var Chdata;
  beforeEach(inject(function (_Chdata_) {
    Chdata = _Chdata_;
  }));

  it('should do something', function () {
    expect(!!Chdata).toBe(true);
  });

});
