'use strict';

var https = require('https');
var q = require('q');
var config = require('../../config');
var _= require('lodash');


var putData = function(url, data) {
    var body = '';
    var deferred = q.defer();

    var options = _.assign(config.oms.options);

    var sendData = '';

    _.each(data, function(value, key) {
        if (typeof value === 'object') {
            sendData += key + '=' + encodeURIComponent(JSON.stringify(value)) + '&';
        } else {
            sendData += key + '=' + encodeURIComponent(value) + '&';
        }
    });


    options.headers = {};
    options.headers['Content-Length'] = sendData.length;
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    options.method = "PUT";
    options.path = url;


    var request = https.request(options, function(response) {


        response.on('data', function(chunk) {
            body += chunk;
        });
        response.on('end', function() {
            deferred.resolve(body);
        });

    }).on('error', function(e) {
        deferred.reject(e);
    });

    request.write(sendData);
    request.end();
    return deferred.promise;

};

var getData = function(url){
        console.log(url);
        var deffered = q.defer();
        try{
            var body ='';
            https.get(url,function(response){
                response.on('data',function(chunk){
                    body += chunk;
                });
                response.on('end',function(){
                    deffered.resolve(body);
                });
            });
        }catch (err){
            deffered.reject(err);
        };
        return deffered.promise;
        
};

exports.putData = putData;
exports.getData = getData;
