'use strict';

angular.module('app')
.factory('topicCorrelationDataService', function ($http) {
	
	function getData() {
		return $http.get('/api/topic-correlation/data')
		.then(function (response) {
			return response.data;
		});
	}
	
	return {
		getData: getData
	};
});