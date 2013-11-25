'use strict';

describe('Service: Datamon', function () {

    // load the service's module
    beforeEach(module('limonadaApp'));

    // instantiate service
    var Storage, Datamon, deferred, http, _;
    beforeEach(inject(function (_Datamon_, _Storage_, $q, $httpBackend, ___) {
        Datamon = _Datamon_;
        Storage = _Storage_;
        deferred = $q.defer();
        http = $httpBackend;
        _ = ___;
    }));
    
    describe('Start:', function(){
        it('should have a start method', function(){
           expect(typeof Datamon.start).toBe('function');
        });
        
        it('should throw an error when start without a callback function', function(){
            expect(Datamon.start).toThrow();
        });
    
        it('should call changeset.initialize when a callback is set', function(){
            spyOn(_, 'publish');
            Datamon.start(function(){});
            expect(_.publish).toHaveBeenCalled(); 
        });
    });
    describe('Local Changeset Load:', function(){
       it('should load local changeset', function(){
            
       }); 
    });    
});