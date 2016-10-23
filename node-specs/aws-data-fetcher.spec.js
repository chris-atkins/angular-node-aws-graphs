'use strict';

var awsDataFetcher = require('../aws-data-fetcher');
var AWS = require('aws-sdk');

describe('the AWS data fetcher', function () {
	
	function buildS3ResponseWithData(expectedData) {
		return {
			"AcceptRanges": "bytes",
			"LastModified": "Sun, 23 Oct 2016 00:13:25 GMT",
			"ContentLength": "78509",
			"ETag": "\"e6c3c025a530873e4e1be2283646fc71\"",
			"ContentType": "application/octet-stream",
			"Metadata": {},
			"Body": new Buffer(JSON.stringify(expectedData), "utf-8")
		};
	}
	
	it('returns data from S3', function (done) {
		var expectedData = {data: {something: 'withData'}};
		
		var mockS3 = {
			getObject: function () {
			}
		};
		spyOn(AWS, 'S3').andReturn(mockS3);
		
		spyOn(mockS3, 'getObject').andCallFake(function (options, callback) {
			expect(options.Bucket).toBe('sample-aws-app');
			expect(options.Key).toBe('graphData.json');
			var s3Response = buildS3ResponseWithData(expectedData);
			callback(null, s3Response);
		});
		
		awsDataFetcher.getData(function (data) {
			expect(data).toEqual(expectedData);
			expect(mockS3.getObject).toHaveBeenCalled();
			done();
		});
	});
});