'use strict';

var _ = require('lodash');
var https = require('https');
var config = require('../../config');
var querystring = require('querystring');
var Order = require('./order.service.js');
var ConsignmentCtrl = require('../consignment/consignment.controller.js');
var q = require('q');
var ConsignmentService = require('../consignment/consignment.service.js');


var get = function(req, res) {

    var queryObject = req.query;
    var searchQuery = '';

    for (var query in queryObject) {
        searchQuery = searchQuery + query + '=' + queryObject[query] + '&';
    };

    searchQuery = searchQuery.substring(0, searchQuery.length - 1);


    var url = config.oms.url + config.oms.apiversion + '/n3ow/consignment/search?' +
        searchQuery;

    console.log(url);

    Order.getData(url)
        .then(function(response) {

            var allConsignents = JSON.parse(response);
            response = JSON.parse(response);
            allConsignents = allConsignents.content;
            console.log(allConsignents);
            var defered = q.defer();
            var promises = [];
            var returnOrderArray = [];

            for (var consignment in allConsignents) {
                console.log('consignment ID');

                console.log(allConsignents[consignment]);
                promises.push(ConsignmentCtrl.get(allConsignents[consignment]));

            };

            q.all(promises).then(function(responseQ) {
                for (var i = 0; i < responseQ.length; i++) {
                    returnOrderArray.push(responseQ[i]);
                };

                console.log('Final response');
                console.log(responseQ);



                response.content = returnOrderArray;
                res.status(200).send(response);
                // do things after your inner functions run 
            });

        }, function(err) {
            res.status(500).send(err);
        });

};

var getConsignmentList = function(req, res) {


    var url = config.oms.url + config.oms.apiversion + '/n3ow/orders/' + req.params.orderID + '/?fields=consignments.consignmentId';

    console.log(url);

    Order.getData(url)
        .then(function(response) {

            var response = JSON.parse(response);
            var consignmentObject = response.consignments[0];
            res.status(200).send(consignmentObject);
        }, function(err) {
            res.status(500).send(err);
        });


};



exports.get = get;
exports.getConsignmentList = getConsignmentList;
