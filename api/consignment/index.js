'use strict';

var express = require('express');
var controller = require('./consignment.controller');

var router = express.Router();

router.get('/:consignmentID', controller.getProcessed);

module.exports = router;
