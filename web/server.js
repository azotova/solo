var express = require('express');

var handler = require('./request-handler');
var parser = require('body-parser');


var port = process.env.PORT || 3000;

var server = express();

  
server.use(express.static(__dirname + '/../client'));
server.use(parser.json({strict: false}));


server.get('/words', handler.get);
server.post('/words', handler.post);


console.log('Listening on port' + port);
server.listen(port);
