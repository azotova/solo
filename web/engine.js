var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');
var newRequest = require('request');


exports.sites = ["www.huffingtonpost.com", "www.newyorker.com"];

exports.paths = {
  'searchRes' : path.join(__dirname, '../pages/searchres'),
  'pages' : path.join(__dirname, '../pages')
};

exports.getHtml = function (i, word, sitesToSearch, callback) {
  sitesToSearch = sitesToSearch || exports.sites;
  var query = "https://www.google.com/?gws_rd=ssl#q=%22" + word + "%22+link:" + sitesToSearch[i];
  var savePath = sitesToSearch[i];
  console.log("savePath", savePath);
  console.log("query", query);
  newRequest.get(query, function(err,res, html) {
  	if (err) {
      console.log("scrapingErr", err)
    };
    console.log("savePathnew", savePath);
    callback(html, savePath);
  })
}

exports.askGoogle = function (word, sitesToSearch) {
  sitesToSearch = sitesToSearch || exports.sites;
  for (var i=0; i< sitesToSearch.length;i++) {
    //query = "https://www.google.com/?gws_rd=ssl#q=%22" + word + "%22+link:" + sitesToSearch[i];
    this.getHtml(i, word, sitesToSearch, function (html, savePath){
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


