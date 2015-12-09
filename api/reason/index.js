 'use strict';

 var express = require('express');
 
 var controller =  require('./reason.controller');

 var router = express.Router();


 router.get('/consignment', controller.getConsignmentReasonList);


 router.get('/item', controller.getItemReasonList);

 module.exports = router;
