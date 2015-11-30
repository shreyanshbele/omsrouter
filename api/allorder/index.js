'use strict';

var express = require('express');
var controller = require('./allorder.controller');

var router = express.Router();

router.get('/:store/:query', controller.get);

module.exports = router;

