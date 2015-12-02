'use strict';

var _ = require('lodash');
var http = require('http');
var config = require('../../config');
var querystring = require('querystring');
var q = require('q');

var getData = function(url) {
  var defered = q.defer();
  try {
    var body = '';
    https.get(url, function(response) {
      response.on('data', function(chunk) {
        body += chunk;
      });
      response.on('end', function() {

        defered.resolve(body);
      });
    })
  } catch (err) {
    defered.reject(err);
  }
  return defered.promise;
};

var postData = function(url, data) {
  

  var defered = q.defer();
  //set request parameters and payload
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
  options.path =  url;
  options.method = "POST";


  var body = '';
  var output = '';
  //send request and return defered
  var request = http.request(options, function(response) {
    
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      defered.resolve(body);
    });
  }).on('error', function(e) {
    defered.reject(e);
  });
  request.write(sendData);
  request.end();
  return defered.promise;
};

exports.getData = getData;
exports.postData = postData;