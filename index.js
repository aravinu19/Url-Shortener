var express = require("express");
var bodyparser = require("body-parser");
var shortener = require("./mainApp/app.js");

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

shortener(app);

var server = app.listen(4000, () => {
  console.log("Url Shortening Server is Up and Running on ", server.address().port);
});
