var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');


exports.sites = ["www.huffingtonpost.com", "www.newyorker.com"];

exports.paths = {
  'searchRes' : path.join(__dirname, '../pages/searchres'),
  'pages' : path.join(__dirname, '../pages')
};

exports.askGoogle = function (word, sitesToSearch) {
  sitesToSearch = sitesToSearch || exports.sites;
  for (var i=0; i< sitesToSearch.length;i++) {
    var query = "https://www.google.com/?gws_rd=ssl#q=%22" + word + "%22+link:" + sitesToSearch[i];
    console.log("query", query);
    httpRequest.get({ "url": query },
                   this.paths.searchRes + "/" + sitesToSearch[i],
                   function(err,res) { console.log("Downloaded search results")});	
  }
   
}


