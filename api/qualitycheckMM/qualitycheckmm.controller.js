'use strict';

var config = require('../../config');
var QualityCheckMMService = require('./qualitycheckmm.service');
var q = require('q');
var ConsignmentCtrl = require('../consignment/consignment.controller.js');


var get = function(req, res) {
    // Get Consignment IDs

    var data = {};
    data['single'] = [];
    data['multiple'] = [];

    var urlConsignementList = config.oms.url + config.oms.apiversion + '/n3ow/consignment/search?'

    +'eancode=' + req.params.eanCode + '&fulfilmentCenterId=1&consignmentStatus=2';

    QualityCheckMMService.getData(urlConsignementList)
        .then(function(response) {
            ///
            console.log(response);
            var allConsignents = JSON.parse(response);
            allConsignents = allConsignents.consignment;
            console.log(allConsignents);
            var defered = q.defer();
            var promises = [];

            for (var consignment in allConsignents) {
                console.log('consignment ID');

                console.log(allConsignents[consignment]);
                promises.push(ConsignmentCtrl.getConsignmentWithCount(allConsignents[consignment]));

            };


            q.all(promises)
                .then(function(responseQ) {

                    for (var i = 0; i < responseQ.length; i++) {
                        if(responseQ[i].consignmentItemCount =='1')
                        data['single'].push(responseQ[i]);
                    else 
                        data['multiple'].push(responseQ[i]);
                    };

                    res.status(200).send(data);


                }, function(error) {
                    // Process Some 
                    res.status(500).send(error);
                });


            ///


        }, function(error) {
            // Process Some 
            res.status(500).send(error);
        });


};




var getDetail = function(res, req) {

    // Get Details And Slot ID
    var urlConsignmentDetail = config.oms.url + config.oms.apiversion + '/n3ow/consignment/' + res.params.consignmentID;


    QualityCheckMMService.getData(urlConsignmentDetail)
        .then(function(response) {

            var response1 = JSON.parse(response);


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
                processedItemInstance['eanCode'] = mboitemDetail['eanCode'];


                //if(itemPASS OR FAIL ){} Based On Status

                //processedItemInstance['itemStatus'] = currentItem['itemStatus']['name'];
                processedItemInstance['itemStatus'] = 2;

                processedItemInstance['actionTaken'] = false;

                processedItemInstance['showButton'] = false;


                processedItemInstance['itemQCStatus'] = 'Pass'; // Or Fail

                processedItemInstance['itemQCComment'] = '';
                // if(other reason than handle here)
                processedItemInstance['qcfailReason'] = 2;


                processedItemInstance['discountPrice'] = currentItem['priceDetails']['finalPrice'];

                //Push to array
                itemsProcessedArray.push(processedItemInstance);
            };


            processedData['items'] = itemsProcessedArray;


            return req.status(200).send(processedData);

        }, function(error) {

            res.status(500).send(error);
        });


};



exports.getDetail = getDetail;
exports.get = get;
