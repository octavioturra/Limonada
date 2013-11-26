'use strict';

angular.module('channelData')
    .factory('chData', function (_, chHttp) {
        var URL, OD = 0,
            UD = 1;

        function ChannelData() {}

        ChannelData.prototype.start = function (url) {
            URL = url;
            _.publish('changeset.start');
        };
        ChannelData.prototype.reload = function(){
            if(!!URL===false){
                _.publish('data.fail', 'Empty URL');
            }
            _.publish('changeset.start');
        }

        ChannelData.prototype.loadChangeset = function () {
            _.local().getData('changeset', function (_, d) {
                if ( !! d === false) {
                    _.publish('changeset.empty');
                    _.publish('changeset.loaded', 0);
                } else {
                    _.publish('changeset.loaded', d);
                }
            });
        };

        ChannelData.prototype.processDataFromServer = function (d) {
            if ( !! d === false) {
                _.publish('data.fail', 'Empty data result.');
            } else if (d.success === false) {
                _.publish('data.fail', 'Error:' + d.message);
            }
            if (d.data.state === UD) {
                _.publish('data.update');
            } else if (d.data.state === OD) {
                _.publish('data.outdate', {
                    changeset: d.data.changeset,
                    content: d.data.content
                });
            } else {
                _.publish('data.fail', 'Wrong state.');
            }
        };

        ChannelData.prototype.loadFromServer = function (changeset) {
            var self = this;
            chHttp
                .get(URL, {
                    changeset: changeset
                })
                .then(function Success(d) {
                    self.processDataFromServer(d);
                }, function Fail(d){
                    _.publish('data.fail', 'Error:' + d);
                });
        };

        ChannelData.prototype.update = function (data) {
            _.local().setData('changeset', data.changeset, 'data', data.content, function () {
                _.publish('data.update');
            });
        };

        ChannelData.prototype.loadFromLocal = function () {
            _.local().getData('data', function (_, d) {
                if ( !! d === false) {
                    _.publish('data.fail', 'Empty data container.');
                } else {
                    _.publish('data.loaded', (d.length>0)?d[0]:[]);
                }
            });
        };

        var channelData = new ChannelData();

        _.subscribe('changeset');
        _.subscribe('changeset.start', function () {
            channelData.loadChangeset();
        });
        _.subscribe('changeset.empty');
        _.subscribe('changeset.loaded', function (label, changeset) {
            _.publish('data.start', changeset);
        });

        _.subscribe('data');
        _.subscribe('data.start', function (label, changeset) {
            channelData.loadFromServer(changeset);
        });
        _.subscribe('data.fail', console.log);
        _.subscribe('data.outdate', function (label, data) {
            channelData.update(data);
        });
        _.subscribe('data.update', function () {
            channelData.loadFromLocal();
        });
        _.subscribe('data.loaded');
        window.channelData = channelData;
        return channelData;
    });