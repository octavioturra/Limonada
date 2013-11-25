'use strict';

describe('Service: _(pubslub)', function () {

    // load the service's module
    beforeEach(module('limonadaApp'));

    // instantiate service
    var _;
    beforeEach(inject(function (___) {
        _ = ___
    }));

    it('should have a publish method', function(){
        expect(typeof _.publish).toBe('function');
    });
    it('should have a subscribe method', function(){
        expect(typeof _.subscribe).toBe('function');
    });
    it('should have a unsubscribe method', function(){
        expect(typeof _.unsubscribe).toBe('function');
    });
});
