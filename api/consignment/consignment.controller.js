'use strict';

var _ = require('lodash');
var http = require('http');
var config = require('../../config');
var querystring = require('querystring');
var ConsignmentService = require('./consignment.service.js');

var get = function(consignmentID) { // Called For Order Page


    var url = config.oms.url + config.oms.apiversion + '/n3ow/consignment/' + consignmentID;

    console.log(url);
    return ConsignmentService.getData(url)
        .then(function(response) {

            response = JSON.parse(response);
            console.log('Consignment Details');
            console.log(response);
            var processedData = {};

            processedData['orderId'] = response['orderId'];

            // Consignment Details Processed

            var consignmentArray = response['consignments'];
            var firstConsignment = consignmentArray[0];


            processedData['consignmentId'] = firstConsignment['consignmentId'];


            processedData['consignmentItemCount'] = firstConsignment['count'];


            var itemsArrray = firstConsignment['items'];


            var firstItem = itemsArrray[0];
            /*   date part
             var countDownDiff = 
              Date.parse(firstItem['slaEndTime']) - Date.parse(new Date());
              console.log(Date.parse(firstItem['slaEndTime']));
              console.log(Date.parse(new Date()));
             processedData['countDown'] = countDownDiff/1000;*/



            processedData['orderType'] = firstItem['fulfillmentType']['name'];
            processedData['fullfilmentCenter'] = firstItem['fullfilmentCenter']['name'];

            //Logistic Object
            var logistic = firstItem['logistics'];
            processedData['shipmentID'] = logistic['shipmentId'];
            processedData['deliveryDate'] = logistic['deliveryDate'];
            processedData['deliveryType'] = logistic['deliveryType'];

            var priceDetails = firstItem['priceDetails'];



            var itemsProcessedArray = [];

            var sumofConsignment = 0;

            var discountedsumofConsignment = 0 ;

            for (var item in itemsArrray) {

                sumofConsignment = sumofConsignment + parseInt(itemsArrray[item]['priceDetails']['price']);
                discountedsumofConsignment = discountedsumofConsignment + parseInt(itemsArrray[item]['priceDetails']['finalPrice']);
            };

            processedData['consignmentValue'] = sumofConsignment;
            processedData['discountedsum'] = discountedsumofConsignment;
            processedData['orderDate'] = response['orderDate'];
            processedData['customerName'] = response['customer']['firstName'] + ' ' + response['customer']['lastName'];
            processedData['orderStatus'] = response['orderStatus']['orderStatus'];

            console.log('Information Details For Consigment ID' + processedData['consignmentId']);
            console.log(processedData);

            return processedData;
        }, function(err) {
            return err;
        });

};

var DataGrouper = (function() {
    var has = function(obj, target) {
        return _.any(obj, function(value) {
            return _.isEqual(value, target);
        });
    };

    var keys = function(data, names) {
        return _.reduce(data, function(memo, item) {
            var key = _.pick(item, names);
            if (!has(memo, key)) {
                memo.push(key);
            }
            return memo;
        }, []);
    };

    var group = function(data, names) {
        var stems = keys(data, names);
        return _.map(stems, function(stem) {
            return {
                commonData: stem,
                itemIDs:_.map(_.where(data, stem), function(item) {
                    return _.omit(item, names);
                })
            };
        });
    };

    group.register = function(name, converter) {
        return group[name] = function(data, names) {
            return _.map(group(data, names), converter);
        };
    };

    return group;
}());



var getProcessed = function(req, res) { // For Detail Page


    var url = config.oms.url + config.oms.apiversion + '/n3ow/consignment/' + req.params.consignmentID;
    console.log(url);
    ConsignmentService.getData(url)
        .then(function(response) {
            
            response = JSON.parse(response);
            var processedData = {};

            // Customer Details
            processedData['customerDetails'] ={};
            processedData['customerDetails']['name'] = response['customer']['firstName'] + ' ' + response['customer']['lastName'];
            processedData['customerDetails']['mailID'] ='';
            processedData['customerDetails']['phoneNumber'] = '';



            var consignmentArray = response['consignments'];
            var firstConsignment = consignmentArray[0];
            var itemsArrray = firstConsignment['items'];
            var firstItem = itemsArrray[0];

            
            //Logistic Object
            var logistic = firstItem['logistics'];
            


            var priceDetails = firstItem['priceDetails'];


            var sumofConsignment = 0;

            for (var item in itemsArrray) {

                sumofConsignment = sumofConsignment + parseInt(itemsArrray[item]['priceDetails']['price']);
            };

            processedData['consignmentDetails'] ={};
            processedData['consignmentDetails']['orderID'] = response['orderId'];
            processedData['consignmentDetails']['orderDate'] =response['orderDate'];
            processedData['consignmentDetails']['orderStatus'] = response['orderStatus']['orderStatus'];

            processedData['consignmentDetails']['consignmentID'] = firstConsignment['consignmentId'];
            processedData['consignmentDetails']['consignmentItemCount'] = firstConsignment['count'];
            
            
            

            processedData['consignmentDetails']['shippingPatner'] = logistic['logisticsPartner'];
            processedData['consignmentDetails']['logisticsLink'] = logistic['logisticsLink'];
            processedData['consignmentDetails']['deliveryType'] = logistic['deliveryType'];
            processedData['consignmentDetails']['shipmentID'] = logistic['shipmentId'];
            processedData['consignmentDetails']['delieveryDate'] = logistic['deliveryDate'];
            
            processedData['consignmentDetails']['totalCost'] = sumofConsignment;
            processedData['consignmentDetails']['orderingStore'] = '';  
            processedData['consignmentDetails']['consignmentStatus'] = '';// need To confirm
            
 
            // Process Data For Items
            var itemsProcessedArray = [];
            
            for (var i in itemsArrray) {
                // store in this object
                var processedItemInstance = {};
                // process i th item
                var currentItem = itemsArrray[i];

                processedItemInstance['itemID'] = currentItem['itemId'];
                processedItemInstance['itemPicked'] = true;
                processedItemInstance['itemQCPass'] = false;
                processedItemInstance['itemQCComment'] = '';
                processedItemInstance['qcfailReason'] = 2;
                processedItemInstance['itemStatus'] = currentItem['itemStatus']['name'];
                processedItemInstance['discountPrice'] = currentItem['priceDetails']['finalPrice'];


                var mboitemDetail = currentItem['mboProducts'][0];
                processedItemInstance['skuID'] = mboitemDetail['sku'];
                processedItemInstance['brand'] = mboitemDetail['brand'];
                processedItemInstance['size'] = mboitemDetail['size'];
                processedItemInstance['color'] = mboitemDetail['color'];
                processedItemInstance['mrp'] = mboitemDetail['mrp'];
                processedItemInstance['image'] = mboitemDetail['img'];



                processedItemInstance['styleCode'] = mboitemDetail['mboProductId'];

                processedItemInstance['quantityOrder'] = 1;
                processedItemInstance['quantityPicked'] = 0;
                processedItemInstance['quantityPickFail'] = 0;
                processedItemInstance['quantityQCFail'] = 0;

                //Push to array
                itemsProcessedArray.push(processedItemInstance);
            };

            processedData['items'] = [];

            /// Group The data
            var finaldata = 

            DataGrouper(itemsProcessedArray, [
                
                'itemStatus',
                'skuID',
                'brand',
                'size',
                'color',
                'mrp',
                'image',
                'discountPrice',
                'styleCode',

                'quantityOrder',
                'quantityPicked',
                'quantityPickFail',
                'quantityQCFail']);

            // Process the group data
            for (var i in finaldata) {
                // store in this object
                var finalObject = {};
                // process i th item
                
                var currentItem = finaldata[i]; 
                
                finalObject['itemIDs'] = currentItem['itemIDs'];   

                var commonData = currentItem['commonData'];
                finalObject['itemStatus'] = commonData['itemStatus'];
                finalObject['skuID'] = commonData['skuID'];
                finalObject['brand'] = commonData['brand'];
                finalObject['size'] = commonData['size'];
                finalObject['color'] = commonData['color'];
                finalObject['mrp'] = commonData['mrp'];
                finalObject['discountPrice'] = commonData['discountPrice'];
                finalObject['image'] = commonData['image'];
                finalObject['styleCode'] = commonData['styleCode'];
                finalObject['quantityOrder'] = currentItem['itemIDs'].length;
                finalObject['quantityPickFail'] = currentItem['itemIDs'].length;
                finalObject['quantityPicked'] = commonData['quantityPicked'];

                // Commenting because pickfail + pick = quantity order
                //finalObject['quantityPickFail'] = commonData['quantityPickFail'];


                finalObject['quantityQCFail'] = commonData['quantityQCFail'];

                //Push itemids directly..

                
                console.log(finalObject['itemIDs']);
                //Push to array
                processedData['items'].push(finalObject);
            };



            console.log('Information Details For Consigment ID ' + processedData['consignmentId']);
            
            console.log(processedData);

            return res.status(200).send(processedData);
        }, function(err) {
            return res.status(501).send(err);;
        });
};






exports.get = get;
exports.getProcessed = getProcessed;


