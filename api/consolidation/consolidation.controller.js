'use strict';

var config = require('../../config');
var ConsignmentService = require('../consignment/consignment.service.js');
var ConsolidationService = require('./consolidation.service');
var q = require('q');

var pickByHUCode = function(req, res) {
    // Get item ID  And Consignment ID
    // Update the Item In UI

        var itemID = '';
        var consignmentID = '';
        var data = {};
        var urlWHID = config.oms.url + config.oms.apiversion +
        '/n3ow/warehouseItemId/' + req.body.id + '/orderItemId';

        var urlConsignementID = config.oms.url + config.oms.apiversion +
        '/n3ow/warehouseItemId/' + req.body.id + '/consignmentId';
    
        var deffered = q.defer();
        var promises = [];

        promises.push(ConsolidationService.getData(urlWHID));
        promises.push(ConsolidationService.getData(urlConsignementID));
        
        q.all(promises).then(function(response){
            data['orderItemId'] = JSON.parse(response[0])['orderItemId'];
            data['consignmentId'] = JSON.parse(response[1])['consignmentId'];
            console.log(data);
            res.status(200).send(data);
        },function(error){
            // Process Some 
            res.status(500).send(error);
        });
};


var pickByEANCode = function(req, res) {
    // Get item ID 
    
};

var getDetail = function(res, req){


    var url = config.oms.url + config.oms.apiversion + '/n3ow/consignment/' + res.params.consignmentID;

    ConsignmentService.getData(url)
        .then(function(response) {

            response = JSON.parse(response);
            

            // Finally return  processedData
            var processedData = {};

            

            // Consignment Details Processed

            var consignmentArray = response['consignments'];

            var firstConsignment = consignmentArray[0];

            processedData['orderId'] = response['orderId'];

            processedData['totalItems'] = firstConsignment['count'];

            processedData['totalItemsPicked'] = 0;


            var itemsProcessedArray =[];

            // Items Array
            var itemsArrray = firstConsignment['items'];

            for (var i in itemsArrray) {
                // store in this object
                var processedItemInstance = {};
                // process i th item
                var currentItem = itemsArrray[i];

                processedItemInstance['itemID'] = currentItem['itemId'];

                // Fixed Information
                var mboitemDetail = currentItem['mboProducts'][0];
                processedItemInstance['skuID'] = mboitemDetail['sku'];
                processedItemInstance['brand'] = mboitemDetail['brand'];
                processedItemInstance['size'] = mboitemDetail['size'];
                processedItemInstance['color'] = mboitemDetail['color'];
                processedItemInstance['mrp'] = mboitemDetail['mrp'];
                processedItemInstance['image'] = mboitemDetail['img'];
                processedItemInstance['styleCode'] = mboitemDetail['mboProductId'];


                //if(itemPicked ){} Based On Status
                processedItemInstance['itemPicked'] = true;
                processedItemInstance['itemQCPass'] = false;
                processedItemInstance['itemQCComment'] = '';
                processedItemInstance['qcfailReason'] = 2;
                processedItemInstance['itemStatus'] = currentItem['itemStatus']['name'];
                processedItemInstance['discountPrice'] = currentItem['priceDetails']['finalPrice'];



                

                if(currentItem['itemStatus']['name']=='INTIATED'){ // Change It To id
                    processedData['totalItemsPicked'] += 1; 
                }
                 
                //Push to array
                itemsProcessedArray.push(processedItemInstance);
            };
            

            processedData['items'] = itemsProcessedArray;


            return req.status(200).send(processedData);
        }, function(err) {
            return req.status(500).send(err);
        });
    
   
};

var get = function(res, req){


    var url = config.oms.url + '/api/n3ow/v1.01/consignment/' + res.params.consignmentID;
    console.log(url);
    req.status(200).send("Hii");
   
};




exports.pickByHUCode = pickByHUCode;
exports.pickByEANCode = pickByEANCode;
exports.getDetail = getDetail;
exports.get = get;
