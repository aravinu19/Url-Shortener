var base = require("base62");
var adler = require("adler32");

var shortener = function(app) {
  app.post("/shorten", (req, res) => {

    var url = req.body.url;
    var dataBuf = new Buffer(url);
    var checksum = adler.sum(dataBuf);
    var Shorturl = "https://shrten.iva/";

    Shorturl += base.encode(checksum);

    res.json({shortURL : Shorturl});

    console.log(url + "   " + Shorturl);

  });
}

module.exports = shortener;
