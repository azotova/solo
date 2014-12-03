var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');
var newRequest = require('request');
var cheerio = require('cheerio');
var httpHelpers = require('./http-helpers');


//exports.sites = ["www.huffingtonpost.com", "www.newyorker.com"];

exports.links = [];

exports.paths = {
  'searchRes' : path.join(__dirname, '../pages/searchres'),
  'pages' : path.join(__dirname, '../pages')
};

exports.results = [];


exports.askGoogleNew = function (word, callback, respo) {
  var query = "https://www.googleapis.com/customsearch/v1?key=AIzaSyA2yTuER8fAeUQ6SA-iTNCsnrpb7IuoCuY&cx=011401941214739866178:jv3spknumbi&q="+word;
  console.log("resGoog", respo.statusCode);
  newRequest.get(query, function(err,res, html) {
  	if (err) {
      console.log("scrapingErr", err)
    };
    //console.log("savePathnew", JSON.parse(res.body).items);
    var linkReceived = JSON.parse(res.body).items;
    if (!linkReceived || linkReceived.length===0) {
      exports.results=[["Sorry, we did not find anything", "writeBetter"]];
      httpHelpers.sendResponsePost(respo);
      console.log("Nothing found");
      return;
    }
    for (var i = 0; i<linkReceived.length; i++) {
      exports.links.push([linkReceived[i].link, linkReceived[i].displayLink]);
    }
    console.log("linksRec", exports.links);
    //console.log("resGoogInt", respo.statusCode);
    callback(word, exports.links, respo);
  })
}


exports.cleanNew = function() {
	exports.links = [];
	exports.results = [];
}


exports.getHtml = function (i, sitesToSearch, respo, callback) {
  sitesToSearch = sitesToSearch || exports.links;
  var query = sitesToSearch[i][0];
  var savePath = "a"+i;
  console.log("savePath", savePath);
  console.log("query", query);
  newRequest.get(query, function(err,res, html) {
  	if (err) {
      console.log("scrapingErr", err)
    };
    //console.log("savePathnew", res);
    console.log("resGoog", respo.statusCode);
    callback(html, respo);
  })
}


exports.getPages = function (word, sitesToSearch, respo) {
  sitesToSearch = sitesToSearch || exports.links;
  var counter = 0;
  for (var i=0; i< 5;i++) {
    exports.getHtml(i, sitesToSearch, respo, function (html, respo){
      var $ = cheerio.load(html);

      $('p').each(function(j, el) {
      	  var text = $(this).text();
      	  var wordNoQuotes = word.slice(1,word.length-1)
      	  console.log("text", text, wordNoQuotes);
          if (text.indexOf(wordNoQuotes)!==-1) {
          	console.log("Hi");
            exports.results.push([text,sitesToSearch[i][1]]);
          }
          console.log("ind", j);
       });
      console.log("results", exports.results);
      counter++;
      if (counter ===5) {
        console.log("searchCount", counter);
        httpHelpers.sendResponsePost(respo);	
      }
    });	
  }
};



