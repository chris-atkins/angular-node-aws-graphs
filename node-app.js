'use strict';
var express = require('express');

var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dataFetcher = require('./data-fetcher');

var port = process.env.PORT || '8000';
var app = express();

app.set('port', port);
app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.urlencoded({extended: 'true'}));
app.use(bodyParser.json());

app.get('/api/topic-correlation/data', function (request, response, next) {
	response.statusCode = 200;
	response.json(dataFetcher.getData());
});

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});