'use strict';

var rs = require('request-promise');
var config = browser.params;

describe('the endpoint', function() {

	function performDataGET() {
		var getOptions = {
			uri : config.apiBaseUrl + '/topic-correlation/data',
			json : true,
			simple: false, //https://github.com/request/request-promise
			resolveWithFullResponse: true
		};
		return rs.get(getOptions);
	}
	
	it('returns data that includes 25 data sets', function(done) {
		performDataGET().then(function(response) {
			expect(response.statusCode).toBe(200);
			expect(response.body.length).toBe(25);
		}).then(done, done.fail);
	});
});
