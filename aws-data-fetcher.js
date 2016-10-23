'use strict';
var AWS = require('aws-sdk');

function getData(callback) {
	var s3 = new AWS.S3();
	s3.getObject({Bucket: 'sample-aws-app', Key: 'graphData.json'}, function(err, response) {
		var data = JSON.parse(response.Body.toString('utf-8'));
		callback(data);
	});
}

module.exports = {
	getData: getData
};