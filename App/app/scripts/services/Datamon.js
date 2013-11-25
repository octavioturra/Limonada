'use strict';

angular.module('limonadaApp')
    .service('Datamon', function Datamon($http, $q, _) {
        if(!!_.globals('REMOTE_URL_CHANGESET')===false){
            _.globals('REMOTE_URL_CHANGESET', './data/changeset.json');
            _.globals('REMOTE_URL_DATA', './data/data.json');    
        }
        
        var self = this;
        this.data = [];
        
        var EMPTY=-1, PENDING=0, PARTIAL=1, LOADED=2, FAIL=3, RETRY=4;
        
        self.changeset = {
            status : EMPTY,
            local : null,
            remote : null
        };
          
        self.start = function(cb){
            if(typeof cb!=='function'){
                throw new Error('Incompatible callback function');
            }
            self.cb = cb;
            _.publish('changeset.initialize');
        }
        
        self.localChangesetLoad = function(){
            _.local().getData('changeset', function(_, data){
                _.publish('changeset.loaded', {key:'local', content:data[0]});
            });
        };
        
        self.remoteChangesetLoad = function(){
            $http.get(_.globals('REMOTE_URL_CHANGESET'))
            .success(function(data){
                if(data.success===false){
                    _.publish('changeset.fail', {action:'remote', message:data.message});
                }
                _.publish('changeset.loaded', {key:'remote', content:data.data});
            }).error(function(){
                _.publish('changeset.fail', {action:'remote', message:'Impossible to reach changeset data'});
            });  
        };
        
        self.prepareChangeset = function(data){
            self.changeset[data.key] = data.content;
            if(self.changeset.status===PENDING||self.changeset.status===RETRY){
                self.changeset.status = PARTIAL;
                return PARTIAL;
            }
            if(self.changeset.status===PARTIAL){
                self.changeset.status = LOADED;
                return LOADED;
            }
        };
        
        self.loadRemoteDataToLocal = function(cb){
            if(typeof cb !=='function'){
                throw new Error('Wrong or empty callback function');
            }
            $http.get(_.globals('REMOTE_URL_DATA'))
            .success(function(d){
                if(d.success===false){
                    throw new Error(d.message);
                }
                self.data = d;
                _.local().setData('data', d.data, function(){
                     cb();
                });
            }).error(function(){
                throw new Error('Impossible to reach data') ;
            });
        };
        
        self.loadDataToContainer = function(){
            _.local().getData('data', function(_, d){
                if(!!d===false){
                    throw new Error('Wrong local data container content');
                }
                if(d.length!==1){
                    throw new Error('Empty data content');
                }
                self.cb(d[0]);
                _.publish('data.loaded', d[0]);
            });
        };
        
        self.reload = function(){
            self.loadDataToContainer.apply(this, arguments);
        }
        
        _.subscribe('changeset',function(){});
        _.subscribe('changeset.initialize', function(){
            var load = function(){
                self.localChangesetLoad();
                self.remoteChangesetLoad();    
            }
            switch(self.changeset.status){
                    case EMPTY:
                        self.changeset.status = PENDING;
                        load();
                    break;    
                    case FAIL:
                        self.changeset.status = RETRY;
                        load();
                    break;
                    case RETRY:
                        throw new Error('Impossible to load changeset');
                    break;
            }
        });
        _.subscribe('changeset.loaded', function(key, content){
            if(!!content===false){
                return _.publish('changeset.fail');
            }
            if(!!content.key===false){
                return _.publish('changeset.fail');
            }
            var status = self.prepareChangeset(content);
            if(status===LOADED){
                return _.publish('changeset.complete')
            };
        });
        _.subscribe('changeset.fail', function(key, action){
            self.changeset.status = FAIL;   
        });
        _.subscribe('changeset.complete', function(){
            if(self.changeset.remote!==self.changeset.local){
                _.publish('data.outdated');
            }else{
                _.publish('data.updated');
            }
        });
        _.subscribe('data', function(){});
        _.subscribe('data.outdated', function(){
            self.loadRemoteDataToLocal(function(){
                _.local().setData('changeset', self.changeset.remote, function(){
                    _.publish('data.updated');    
                });
            });
        });
        _.subscribe('data.updated', function(){
            self.loadDataToContainer();
        });
    });