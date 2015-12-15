 'use strict';

 var express = require('express');
 
 var controller =  require('./slot.controller');

 var router = express.Router();


 router.get('/:consignmentID', controller.get);

 module.exports = router;
