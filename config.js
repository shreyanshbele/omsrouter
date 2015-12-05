'use strict';

// Development specific configuration
// ==================================

module.exports = {

    oms: {
        url: "https://demo9569815.mockable.io",
        apiversion: '/api/v1.01',
        options: {
            host: 'https://demo9569815.mockable.io',
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
