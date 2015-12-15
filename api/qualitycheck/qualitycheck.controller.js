'use strict';

var config = require('../../config');
var QualityCheckService = require('./qualitycheck.service');
var q = require('q');

var get = function(req, res) {
    // Get item ID  And Consignment ID
    // Update the Item In UI

    var itemID = '';
    var consignmentID = '';
    var data = {};
    var urlWHID = config.oms.url + config.oms.apiversion +
        '/n3ow/warehouseItemId/' + req.params.huCode + '/orderItemId';

    var urlConsignementID = config.oms.url + config.oms.apiversion +
        '/n3ow/warehouseItemId/' + req.params.huCode + '/consignmentId';

    var deffered = q.defer();
    var promises = [];

    promises.push(QualityCheckService.getData(urlWHID));
    promises.push(QualityCheckService.getData(urlConsignementID));

    q.all(promises).then(function(response) {
        data['orderItemId'] = JSON.parse(response[0])['orderItemId'];
        data['consignmentId'] = JSON.parse(response[1])['consignmentId'];
        console.log(data);
        res.status(200).send(data);
    }, function(error) {
        // Process Some 
        res.status(500).send(error);
    });
};




var getDetail = function(res, req) {

    // Get Details And Slot ID
    var urlConsignmentDetail = config.oms.url + config.oms.apiversion + '/n3ow/consignment/' + res.params.consignmentID;
    
    var slotURL = config.oms.url + config.oms.apiversion + '/consignment/' + res.params.consignmentID + '/slot';

    var deffered = q.defer();
    var promises = [];

    promises.push(QualityCheckService.getData(urlConsignmentDetail));
    promises.push(QualityCheckService.getData(slotURL));

     q.all(promises).then(function(response) {
       
        var response1 = JSON.parse(response[0]);
        var response2 = JSON.parse(response[1]);
        
        
        // Finally return  processedData
        var processedData = {};


        // Consignment Details Processed

        var consignmentArray = response1['consignments'];

        var firstConsignment = consignmentArray[0];

        processedData['orderId'] = response1['orderId'];

        processedData['totalItems'] = firstConsignment['count'];
        
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

            // Fixed Information
            var mboitemDetail = currentItem['mboProducts'][0];
            processedItemInstance['skuID'] = mboitemDetail['sku'];
            processedItemInstance['brand'] = mboitemDetail['brand'];
            processedItemInstance['size'] = mboitemDetail['size'];
            processedItemInstance['color'] = mboitemDetail['color'];
            processedItemInstance['mrp'] = mboitemDetail['mrp'];
            processedItemInstance['image'] = mboitemDetail['img'];
            processedItemInstance['styleCode'] = mboitemDetail['mboProductId'];


            //if(itemPASS OR FAIL ){} Based On Status

           //processedItemInstance['itemStatus'] = currentItem['itemStatus']['name'];
            processedItemInstance['itemStatus'] = 3;

            processedItemInstance['actionTaken'] = true;

            processedItemInstance['showButton'] = false;


            processedItemInstance['itemQCStatus'] = 'Pass';// Or Fail

            processedItemInstance['itemQCComment'] = '';
            // if(other reason than handle here)
            processedItemInstance['qcfailReason'] = 2;


            processedItemInstance['discountPrice'] = currentItem['priceDetails']['finalPrice'];

            //Push to array
            itemsProcessedArray.push(processedItemInstance);
        };


        processedData['items'] = itemsProcessedArray;

        processedData['slotID'] = response2['slotId'];

        return req.status(200).send(processedData);

    }, function(error) {
        
        res.status(500).send(error);
    });


};



exports.getDetail = getDetail;
exports.get = get;
