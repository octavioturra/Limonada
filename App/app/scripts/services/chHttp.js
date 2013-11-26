'use strict';

angular.module('channelData')
    .factory('chHttp', function Chhttp($http, $q) {
        var deferred = $q.defer();
        
        return {
            get: function(url){
                deferred.notify('Data loading');
                $http.get(url).success(function(d){
                    deferred.resolve(d);
                }).error(function(d){
                    deferred.resolve(d);
                });
                return deferred.promise;
            }
        }
    });