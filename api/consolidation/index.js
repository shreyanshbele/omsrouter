'use strict';

var express = require('express');
var controller = require('./consolidation.controller');
var router = express.Router();

router.post('/huCode', controller.pickByHUCode);
router.post('/eanCode', controller.pickByEANCode);
router.get('/detail/:consignmentID', controller.getDetail);

module.exports = router;