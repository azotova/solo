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

exports.results = [];


exports.askGoogleNew = function (word, callback) {
  var query = "https://www.googleapis.com/customsearch/v1?key=AIzaSyA2yTuER8fAeUQ6SA-iTNCsnrpb7IuoCuY&cx=011401941214739866178:jv3spknumbi&q="+word;
  newRequest.get(query, function(err,res, html) {
  	if (err) {
      console.log("scrapingErr", err)
    };
    //console.log("savePathnew", JSON.parse(res.body).items);
    var linkReceived = JSON.parse(res.body).items;
    for (var i = 0; i<linkReceived.length; i++) {
      exports.links.push(linkReceived[i].link);
    }
    console.log("linksRec", exports.links);
    callback(word, exports.links);
  })
}


exports.cleanNew = function() {
	exports.links = [];
	exports.results = [];
}


exports.getHtml = function (i, sitesToSearch, callback) {
  sitesToSearch = sitesToSearch || exports.links;
  var query = sitesToSearch[i];
  var savePath = "a"+i;
  console.log("savePath", savePath);
  console.log("query", query);
  newRequest.get(query, function(err,res, html) {
  	if (err) {
      console.log("scrapingErr", err)
    };
    //console.log("savePathnew", res);
    callback(html, savePath);
  })
}


exports.getPages = function (word, sitesToSearch) {
  sitesToSearch = sitesToSearch || exports.links;
  for (var i=0; i< 5;i++) {
  	// var query = "https://www.google.com/?gws_rd=ssl#q=%22" + word + "%22+link:" + sitesToSearch[i];
   //  console.log("query", query);
   //  var res = parser.parseUrl(query);
   //  console.log("res", res);
    //query = "https://www.google.com/?gws_rd=ssl#q=%22" + word + "%22+link:" + sitesToSearch[i];
    exports.getHtml(i, sitesToSearch, function (html, savePath){
      var $ = cheerio.load(html);

      $('p').each(function(i, el) {
      	  var text = $(this).text();
      	  var wordNoQuotes = word.slice(1,word.length-1)
      	  console.log("text", text, wordNoQuotes);
          if (text.indexOf(wordNoQuotes)!==-1) {
          	console.log("Hi");
            exports.results.push(text);
          }
          console.log("i", i);
       });
      console.log("results", exports.results);
      //var trying = $('em').text();
      // console.log("tr", $);


      //$('.srg').children().length;
      //console.log("lik", linkstry);
      // $('.srg').find()

      /*fs.writeFile(exports.paths.pages+"/"+savePath, html, function (err) {
       if (err) throw err;
       console.log('Saved!');
       });*/
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
   
};

exports.clean = function (callback) {
  fs.readdir(this.paths.searchRes, function (err, files){
  	if (err) { throw err; }
  	if (files.length>0) {
  	  for (var i = 0; i<files.length; i++) {
  	    fs.unlinkSync(exports.paths.pages + "/" + files[i]);
  	  }
  	  console.log("deleted");
  	  callback();  		
  	} else {
  	  callback();
  	}
  });
}


