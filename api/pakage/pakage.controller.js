'use strict';

var _ = require('lodash');
var http = require('http');
var config = require('../../config');
var querystring = require('querystring');
var Pakage = require('./pakage.service.js');

var get = function(req, res) {


    var url = config.oms.url + config.oms.apiversion + '/n3ow/packaging';


    Pakage.getData(url)
        .then(function(response) {
            res.status(200).send(response);
        }, function(err) {
            res.status(500).send(err);
        });

};

var post = function(req,res) {

    var url = config.oms.apiversion + '/n3ow/consignment/'
        + req.body.consignmentID +'/packagingType?value='+ req.body.packagingType;
      
      console.log(url);
      var data ={'value':req.body.packagingType};
      
  Pakage.postData(url,data).then(function(response) {
    res.status(200).send(response);
  }, function(err) {
    res.status(500).send(err);
  });
};

exports.get = get;
exports.post = post;
