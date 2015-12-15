'use strict';

var config = require('../../config');
var ItemService = require('./item.service');

// Update the Items 
var put = function(req, res) {

    var url = config.oms.url + config.oms.apiversion +
        '/n3ow/consignment/' + req.params.consignmentID + '/orderLines/status';

    console.log(url);
    var data = {};
    data['orderLines'] = req.body.orderLines;


    res.status(200).send('OK');
    ItemService.putData(url, data).then(function(response) {
        return res.status(200).send(response);
    }, function(error) {
        return res.status(500).send(error);
    });
};

var get = function(req, res) {
    var url = config.oms.url + config.oms.apiversion +
        '/n3ow/warehouseItemId/' + req.params.warehouseID + '/orderItemId';
    console.log(url);
    ItemService.getData(url).then(function(response) {
        res.status(200).send(response)
    }, function(error) {
        res.status(500).send(error);
    });
};

var getitems = function(request, res) {

    var urlConsignmentDetail = config.oms.url + config.oms.apiversion 
                        + '/n3ow/consignment/' + request.params.consignmentID;
    

     ItemService.getData(urlConsignmentDetail).then(function(response) {
       
        var response1 = JSON.parse(response);
        
        
        // Finally return  processedData
        var processedData = {};


        // Consignment Details Processed

        var consignmentArray = response1['consignments'];

        var firstConsignment = consignmentArray[0];

        processedData['orderId'] = response1['orderId'];
        
        processedData['consignmentID'] = firstConsignment['consignmentId'];


        var itemsProcessedArray = [];

        // Items Array
        var itemsArrray = firstConsignment['items'];

        for (var i in itemsArrray) {

            // store in this object
            var processedItemInstance = {};
            // process i th item
            var currentItem = itemsArrray[i];

            processedItemInstance['itemID'] = currentItem['itemId'];

            //Push to array
            itemsProcessedArray.push(processedItemInstance);
        };


        processedData['items'] = itemsProcessedArray;

        return res.status(200).send(processedData);

    }, function(error) {
        
        res.status(500).send(error);
    });
};

exports.put = put;
exports.get = get;
exports.getitems = getitems;
