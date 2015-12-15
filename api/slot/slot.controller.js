'use strict';

var SlotService = require('./slot.service');
var config = require('../../config');


var get = function(req, res) {

    var slotURL = config.oms.url + config.oms.apiversion + 
    '/consignment/' + req.params.consignmentID + '/slot';

    
    SlotService.getData(slotURL)
        .then(function(response) {
            response = JSON.parse(response);
            return res.status(200).send(response);
        }, function(error) {
            error = JSON.parse(error);
            
            return res.status(500).send(error);
        });

};



exports.get = get;
