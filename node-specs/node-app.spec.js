'use strict';

var dataFetcher = require('../data-fetcher');
var expectedData = require('../graphData.json');

describe('the data fetcher', function() {
	
	it('returns data from json file', function() {
		expect(dataFetcher.getData()).toEqual(expectedData);
	});
});