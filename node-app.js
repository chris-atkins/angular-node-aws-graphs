'use strict';
var express = require('express');

var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var rs = require('request-promise');

var serviceIp = process.env.SERVICE_IP || '127.0.0.1';
var webIp = process.env.WEB_IP || 'localhost';
var serviceRoot = 'http://' + serviceIp + ':5555/api';
var port = process.env.PORT || '8000';

var app = express();

app.set('port', port);
app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.urlencoded({extended: 'true'}));
app.use(bodyParser.json());

function headersFromRequest(request) {
	var headers = {};
	if (request.headers['Content-Type']) {
		headers['Content-Type'] = request.headers['Content-Type'];
	}
	if (request.headers['Content-Length']) {
		headers['Content-Length'] = request.headers['Content-Length'];
	}
	return headers;
}

app.get('/api/recipe', function(request, response, next) {
	performRecipeListGET(request.query.searchString, request.query.recipeBook).then(function(data) {
		response.statusCode = data.statusCode;	
		response.json(data.body);
	})
	.catch(function(error) {
		console.log('Error getting recipes: ', error);
	});
});

function performRecipeListGET(searchString, recipeBookUserId) {
	var uri = serviceRoot + '/recipe';
	if (searchString) {
		uri += '?searchString=' + searchString;
	}
	if(searchString && recipeBookUserId) {
		uri += '&recipeBook=' + recipeBookUserId;
	}
	if(!searchString && recipeBookUserId) {
		uri += '?recipeBook=' + recipeBookUserId;
	}

	var getOptions = {
		uri : uri,
		json : true,
		simple: false,
		resolveWithFullResponse: true
	};
	return rs.get(getOptions);
}

app.get('/api/recipe/:recipeId', function(request, response, next) {
	var recipeId = request.params.recipeId;
	performRecipeGET(recipeId, request).then(function(data) {
		response.statusCode = data.statusCode;	
		response.json(data.body);
	})
	.catch(function(error) {
		console.log('Error getting recipe with id ' + recipeId + ': ', error);
	});
});

function performRecipeGET(recipeId, request) {
	var getOptions = {
		uri : serviceRoot + '/recipe/' + recipeId,
		headers: headersFromRequest(request),
		json : true,
		simple: false,
		resolveWithFullResponse: true
	};
	return rs.get(getOptions);
}

app.post('/api/recipe', function(request, response, next) {
	var recipe = request.body;
	performRecipePOST(recipe, request).then(function(data) {
		response.statusCode = data.statusCode;	
		response.json(data.body);
	})
	.catch(function(error) {
		console.log('Error posting a new recipe:', recipe, 'Error:', error);
	});
});

function performRecipePOST(recipe, request) {
	var postOptions = {
		uri : serviceRoot + '/recipe',
		headers : headersFromRequest(request),
		json : true,
		body : recipe,
		simple: false,
		resolveWithFullResponse: true
	};
	return rs.post(postOptions);
}

app.put('/api/recipe/:recipeId', function(request, response, next) {
	var recipe = request.body;
	performRecipePUT(recipe, request).then(function(data) {
		response.statusCode = data.statusCode;
		response.json(data.body);
	})
	.catch(function(error) {
		console.log('Error putting a new recipe:', recipe, 'Error:', error);
	});
});

function performRecipePUT(recipe, request) {
	var postOptions = {
		uri : serviceRoot + '/recipe/' + recipe.recipeId,
		headers : headersFromRequest(request),
		json : true,
		body : recipe,
		simple: false,
		resolveWithFullResponse: true
	};
	return rs.put(postOptions);
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});