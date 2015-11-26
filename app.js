var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello OMS I Will Route Your API!!!!');
});

var server = app.listen(3300, function () {

  console.log("Server Listening...");

});