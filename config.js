'use strict';

// Development specific configuration
// ==================================

module.exports = {

    oms: {
        url: "https://private-c51f14-optimusprime.apiary-mock.com",
        apiversion: '/api/v1.01',
        options: {
            host: 'http://private-c51f14-optimusprime.apiary-mock.com',
            port: 443
        }
    },
    allorder: [{
        id: 'orderId'
    }, {
        id: 'orderDate'
    }, {
        id: 'consignmentValue'
    }, {
        id: 'customerName'
    }, {
        id: 'shipmentID'
    }, {
        id: 'orderingStore'
    }, {
        id: 'fulfillingStore'
    }, {
        id: 'deliveryDate'
    }, {
        id: 'orderStatus'
    }, {
        id: 'consignmentStatus'
    }, {
        id: 'orderType'
    }, {
        id: 'deliveryType'
    }, {
        id: 'countDown'
    }]
};

/*module.exports = {

  oms: {
    url: "http://172.16.2.224",
    apiversion:  '/api/v1.01',
    options: {
      host: 'http://172.16.2.224',
      port: 8080
    }
  }
};*/
