'use strict';

angular.module('limonadaApp')
    .service('Storage', function Storage() {
        this.get = function(key){
            var item = window.localStorage.getItem(key);
            if(!!item===true){
                return JSON.parse(item);    
            }
            throw new Error('Item ' + key + ' not found.')
            
        };
        this.set = function(key, value){
            if(!!key===false||!!value===false){
                throw new Error('Key or Value not set.');
            }
            return window.localStorage.setItem(key, JSON.stringify(value));
        };
    });