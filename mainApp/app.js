var base = require("base62");
var adler = require("adler32");
var admin = require('firebase-admin');

var serviceAccount = require('C:\\Users\\Aravi\\Downloads\\dbdemo.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dbdemo-b1622.firebaseio.com'
});

var db = admin.database();
var ref = db.ref("shrtenDB/db");

var shortener = function(app) {
  app.post("/shorten", (req, res) => {

    var url = req.body.url;
    var dataBuf = new Buffer(url);
    var checksum = adler.sum(dataBuf);
    var Shorturl = "https://shrten.iva/";
    var basedUrl = base.encode(checksum);
    Shorturl += basedUrl;

    ref.child(basedUrl).set({
      url : url
    });

    res.json({shortURL : Shorturl});

    console.log(url + "   " + Shorturl);

  });

  app.post("/geturl", (req, res) => {

    var shortURL = req.body.url;
    var uniqueCheckSum = shortURL.split("https://shrten.iva/", 2);
    ref.child(uniqueCheckSum[1]).on("value", function(snapshot){
      console.log(snapshot.val());

      var url = snapshot.val();
      res.json(url);

      console.log(shortURL + " " + url.url);

    })

  })

}

module.exports = shortener;
