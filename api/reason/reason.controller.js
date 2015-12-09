'use strict';

var ReasonService = require('./reason.service');
var config = require('../../config');


var getConsignmentReasonList = function(req, res) {
    var url = config.oms.url + config.oms.apiversion + '';
    ReasonService.getData(url)
        .then(function(response) {
            return res.status(200).send(response);
        }, function(error) {
            return res.status(500).send(error);
        });

};

var getItemReasonList = function() {
    var url = config.oms.url + config.oms.apiversion + '';
    ReasonService.getData(url)
        .then(function(response) {
            return res.status(200).send(response);
        }, function(error) {
            return res.status(500).send(error);
        });
};

exports.getConsignmentReasonList = getConsignmentReasonList;
exports.getItemReasonList = getItemReasonList;
