var path = require('path');
var url = require('url');
var httpHelpers = require('./http-helpers');
var fs = require('fs');

// require more modules/folders here!

var routes = {
               "/": './public/index.html',
               "/styles.css": './public/style.css'
             };

var type = {
            "/": "text/html",
            "/styles.css": "text/css"
};

exports.handleRequest = function (req, res) {
  if (req.method === "POST") {
    var content = "";
    req.on("data", function (chunk) {
      content += chunk;
    });

    req.on("end", function(){
      console.log("content", content);
      var statusCode = 201;
      headers['Content-Type'] = "text/html";
      res.writeHead(statusCode, headers);
      var route = url.parse(req.url).pathname;
      httpHelpers.serveAssets(res, routes[route], res.end.bind(res));
    });
  } else {
    var route = url.parse(req.url).pathname;
    console.log("route", route);
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