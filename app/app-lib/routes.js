angular.module('app')
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/home', {templateUrl: 'app-lib/home/home.html', controller: 'HomeCtrl'})
        .when('/topic-correlations', {templateUrl: 'app-lib/topic-correlations/topic-correlations.html', controller: 'TopicCorrelationsCtrl'})
        .otherwise({redirectTo: '/home'});
}]);