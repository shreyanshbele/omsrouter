'use strict';

var express = require('express');
var controller = require('./qualitycheckmm.controller');
var router = express.Router();

router.get('/eanCode/:eanCode', controller.get); // Search By EAN CODE Give 

router.get('/detail/:consignmentID', controller.getDetail); // Detail Of Consignment ID

module.exports = router;

