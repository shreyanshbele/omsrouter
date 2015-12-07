'use strict';

var express = require('express');
var controller = require('./item.controller');
var router = express.Router();

router.put('/:consignmentID', controller.put);


module.exports = router;