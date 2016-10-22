'use strict';

describe('The TopicCorrelationDataService', function () {
	
	beforeEach(angular.mock.module('app'));
	
	describe('| getData function', function () {
		
		it('calls the correct endpoint when invoked', function () {
			angular.mock.inject(function (topicCorrelationDataService, $httpBackend) {
				$httpBackend.expect('GET', '/api/topic-correlation/data').respond({});
				topicCorrelationDataService.getData();
				$httpBackend.verifyNoOutstandingExpectation();
			});
		});
		
		it('returns a promise that resolves to the results of the endpoint', function (done) {
			angular.mock.inject(function (topicCorrelationDataService, $httpBackend) {
				var dataFromServer = {dataForGraph: ['stuff', 'moreStuff']};
				$httpBackend.expect('GET', '/api/topic-correlation/data').respond(dataFromServer);
				
				var responsePromise = topicCorrelationDataService.getData();
				
				responsePromise.then(function (result) {
					expect(result).toEqual(dataFromServer);
					
				}).then(done, done.fail);
				
				$httpBackend.flush();
			});
		});
		
	});
});