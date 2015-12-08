'use strict';

var config = require('../../config');
var ItemService = require('./item.service');

var put = function(req, res) {

    var url = config.oms.url + config.oms.apiversion +
        '/n3ow/consignment/' + req.params.consignmentID + '/orderLines/status';
    
    console.log(url);
    var data = {};
    data['orderLines'] = req.body.orderLines;

  
    
    ItemService.putData(url, data).then(function(response) {
        res.status(200).send(response)
    }, function(error) {
        res.status(500).send(error);
    });
};


exports.put = put;
