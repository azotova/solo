var path = require('path');
var url = require('url');
var httpHelpers = require('./http-helpers');
var engine = require("./engine");
var fs = require('fs');

// require more modules/folders here!

var routes = {
               "/": '../client/index.html',
               "/styles.css": '../client/style.css',
               "/bower_components/jquery/jquery.min.js": '../client/bower_components/jquery/jquery.min.js',
               "/bower_components/underscore/underscore-min.js": '../client/bower_components/underscore/underscore-min.js',
               "/bower_components/underscore/underscore-min.map": '../client/bower_components/underscore/underscore-min.map',
               "/app.js": '../client/app.js'
             };

var type = {
            "/": "text/html",
            "/styles.css": "text/css",
            "/bower_components/jquery/jquery.min.js": 'text/javascript',
            "/bower_components/underscore/underscore-min.js": 'text/javascript',
            "/bower_components/underscore/underscore-min.map": 'text/javascript',
            "/app.js": 'text/javascript'
};

var storage = ["First"];

exports.handleRequest = function (req, res) {
  var route = url.parse(req.url).pathname;  
  console.log("route", route, req.method);
  if (req.method === "POST") {
    var content = "";
    req.on("data", function (chunk) {
      content += chunk;
    });

    req.on("end", function(){
      console.log("content", content);
      storage.push(JSON.parse(content));
      console.log("storage", storage);
      engine.cleanNew();
      engine.askGoogleNew(content);      
      var statusCode = 201;
      //headers['Content-Type'] ='text/html';
      //httpHelpers.serveAssets(res, "../pages/searchres/www.huffingtonpost.com", res.end.bind(res));
      headers['Content-Type'] = 'application/json';
      res.writeHead(statusCode, headers);
      res.end(JSON.stringify({}));
    });
  } else if (req.method === "GET" && route==="/words") {
    headers['Content-Type'] = 'application/json';
    res.writeHead(200, headers);
    res.end(JSON.stringify(storage));
  } else {
    if (routes[route]) {
      headers['Content-Type'] = type[route];
      res.writeHead(200, headers);
      httpHelpers.serveAssets(res, routes[route], res.end.bind(res));
    } else {
      res.writeHead(404);
      res.end("");
    }
  }
};