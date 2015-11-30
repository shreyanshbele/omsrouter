'use strict';

var _ = require('lodash');
var https = require('https');
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


exports.getData = getData;