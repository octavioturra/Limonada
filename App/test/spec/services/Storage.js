'use strict';

describe('Service: Storage', function () {

  // load the service's module
  beforeEach(module('limonadaApp'));

  // instantiate service
  var Storage;
  beforeEach(inject(function (_Storage_) {
    Storage = _Storage_;
  }));
});
