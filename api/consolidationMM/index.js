'use strict';

var express = require('express');
var controller = require('./consolidationmm.controller');
var router = express.Router();


router.get('/eanCode/:eanID', controller.get);

router.get('/detail/:consignmentID', controller.getDetail);

module.exports = router;