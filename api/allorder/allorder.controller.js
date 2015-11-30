'use strict';

var _ = require('lodash');
var http = require('http');
var config = require('../../config');
var querystring = require('querystring');
var AllOrder = require('./allorder.service.js');

var get = function(req, res) {


    var url = config.oms.url + config.oms.apiversion + '/orders/fullfilmentcenter/' +
        req.params.store;


    AllOrder.getData(url)
        .then(function(response) {
          var data = response.
            for (var i =0 ; i < response.length ; i++) {
              response[i]
            };
            res.status(200).send(response);
        }, function(err) {
            res.status(500).send(err);
        });

};


exports.get = get;
