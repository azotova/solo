var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');
var newRequest = require('request');
var cheerio = require('cheerio');
var parser = require('google-search-parser-4hype');


exports.sites = ["www.huffingtonpost.com", "www.newyorker.com"];

exports.links = [];

exports.paths = {
  'searchRes' : path.join(__dirname, '../pages/searchres'),
  'pages' : path.join(__dirname, '../pages')
};


exports.askGoogleNew = function (word) {
  var query = "https://www.googleapis.com/customsearch/v1?key=AIzaSyA2yTuER8fAeUQ6SA-iTNCsnrpb7IuoCuY&cx=011401941214739866178:jv3spknumbi&q="+word;
  newRequest.get(query, function(err,res, html) {
  	if (err) {
      console.log("scrapingErr", err)
    };
    console.log("savePathnew", JSON.parse(res.body).items);
    var linkReceived = JSON.parse(res.body).items;
    for (var i = 0; i<linkReceived.length; i++) {
      exports.links.push(linkReceived[i].link);
    }
    console.log("linksRec", exports.links)
  })
}


exports.cleanNew = function() {
	exports.links = [];
}



/*exports.getHtml = function (i, word, sitesToSearch, callback) {
  sitesToSearch = sitesToSearch || exports.sites;
  var query = "https://www.google.com/?gws_rd=ssl#q=%22" + word + "%22+link:" + sitesToSearch[i];
  var savePath = sitesToSearch[i];
  console.log("savePath", savePath);
  console.log("query", query);
  newRequest.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyA2yTuER8fAeUQ6SA-iTNCsnrpb7IuoCuY&cx=011401941214739866178:jv3spknumbi&q=lectures", function(err,res, html) {
  	if (err) {
      console.log("scrapingErr", err)
    };
    console.log("savePathnew", res);
    callback(html, savePath);
  })
}*/


exports.askGoogle = function (word, sitesToSearch) {
  sitesToSearch = sitesToSearch || exports.sites;
  for (var i=0; i< sitesToSearch.length;i++) {
  	// var query = "https://www.google.com/?gws_rd=ssl#q=%22" + word + "%22+link:" + sitesToSearch[i];
   //  console.log("query", query);
   //  var res = parser.parseUrl(query);
   //  console.log("res", res);
    //query = "https://www.google.com/?gws_rd=ssl#q=%22" + word + "%22+link:" + sitesToSearch[i];
    this.getHtml(i, word, sitesToSearch, function (html, savePath){
      // var $ = cheerio.load(html);

      // $('li.g').each(function(i) {
      //    console.log("i", i);
      //  });
      //var trying = $('em').text();
      // console.log("tr", $);


      //$('.srg').children().length;
      //console.log("lik", linkstry);
      // $('.srg').find()

      fs.writeFile(exports.paths.searchRes+"/"+savePath, html, function (err) {
       if (err) throw err;
       console.log('Saved!');
       });
    });
    /*newRequest.get(query, function(err,res, html) { 
                    console.log("query", query);
                   	if (err) {
                   	  console.log("scrapingErr", err)
                   	};
                   	 var site = query.substring(query.indexOf("%22+link:")+9); 
                   	 	console.log("site", site);
                   	  console.log("exports", exports.paths.searchRes+"/"+sitesToSearch[i])
                   	  fs.writeFile(exports.paths.searchRes+"/"+sitesToSearch[i], html, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
                   }, i);*/	
  }
   
}

exports.clean = function (callback) {
  fs.readdir(this.paths.searchRes, function (err, files){
  	if (err) { throw err; }
  	if (files.length>0) {
  	  for (var i = 0; i<files.length; i++) {
  	    fs.unlinkSync(exports.paths.searchRes + "/" + files[i]);
  	  }
  	  console.log("deleted");
  	  callback();  		
  	} else {
  	  callback();
  	}
  });
}


