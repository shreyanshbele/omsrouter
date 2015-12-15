'use strict';

var express = require('express');
var controller = require('./qualitycheckmm.controller');
var router = express.Router();

router.post('/huCode', controller.pickByHUCode); // Search By HU CODE FOR NORMAL QUALITY PAGE

router.post('/eanCode', controller.pickByEANCode); // Search By EAN CODE FOR NORMAL QUALITY PAGE

router.post('/orderID', controller.pickByHUCode); // Search By Order ID

router.get('/detail/:consignmentID', controller.getDetail); // Detail Of Consignment ID

module.exports = router;
