var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();

app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());


require('./routes')(app);
//Here we are configuring express to use body-parser as middle-ware.



process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';



app.get('/', function (req, res) {
  res.send('Hello OMS I Will Route Your API!!!!');
});

var server = app.listen(3300, function () {

  console.log("Server Listening...");

});