'use strict';

describe('The topic correlation controller', function () {
	
	beforeEach(angular.mock.module('app'));
	
	describe('provides data for graphing', function () {
		
		var $scope;
		var $controller;
		var dataService;
		var $q;
		
		beforeEach(angular.mock.inject(function($rootScope, _$controller_, topicCorrelationDataService, _$q_) {
			$scope = $rootScope.$new();
			dataService = topicCorrelationDataService;
			$q = _$q_;
			$controller = _$controller_;
			
		}));
		
		it('populated from the service when the controller is created', function () {
			var expectedData = {someData: 'yes'};
			
			var deferred = $q.defer();
			var dataPromise = deferred.promise;
			
			spyOn(dataService, 'getData').and.returnValue(dataPromise);
			$controller('TopicCorrelationsCtrl', {
					$scope: $scope,
					topicCorrelationDataService: dataService
				});
			
			deferred.resolve(expectedData);
			$scope.$apply();
			expect($scope.graphData).toEqual(expectedData);
		});
		
		it('does not populate graph data until response is received from data service', function () {
			var deferred = $q.defer();
			var dataPromise = deferred.promise;
			
			spyOn(dataService, 'getData').and.returnValue(dataPromise);
			$controller('TopicCorrelationsCtrl', {
					$scope: $scope,
					topicCorrelationDataService: dataService
				});
			
			$scope.$apply();
			
			expect($scope.graphData).toBe(undefined);
			expect($scope.graphLayout).toBe(undefined);
			expect($scope.graphOptions).toBe(undefined);
			
			deferred.resolve({data: 'someData'});
			$scope.$apply();
			
			expect($scope.graphData).not.toBe(undefined);
			expect($scope.graphLayout).not.toBe(undefined);
			expect($scope.graphOptions).not.toBe(undefined);
		});
	});
	
});