/**
 * Main application routes
 */

'use strict';
var path = require('path');

module.exports = function(app) {

  app.use(function(req, res, next) {
    if (req.headers.origin) {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Auth-Token,X-Access-Token,X-Key');
    }
    next();
  });


  // Insert routes below
  app.use('/api/order', require('./api/order'));

  
  
  app.use('/api/pakage', require('./api/pakage'));
  

  app.use('/api/consignment', require('./api/consignment'));
  

  app.use('/api/item', require('./api/item'));
  

  app.use('/api/reason', require('./api/reason'));
  
  app.use('/api/consolidation', require('./api/consolidation'));
  

  app.use('/api/consolidationmm', require('./api/consolidationMM'));

  app.use('/api/qualitycheck', require('./api/qualitycheck'));
  
  
  app.use('/api/qualitycheckmm', require('./api/qualitycheckMM'));
  
  
  app.use('/api/slot', require('./api/slot'));
   
};
