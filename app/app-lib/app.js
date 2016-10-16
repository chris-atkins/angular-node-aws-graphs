'use strict';

angular.module('app', [
    'ngRoute',
    'ngCookies',
    'underscore',
    'angularTrix',
    'plotly'
])

    .factory('userRequestHeaderInjector', ['$injector', function ($injector) {
        var injector = {
            request: function (config) {
                config.headers.RequestingUser = 'testUser';
                return config;
            }
        };
        return injector;
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('userRequestHeaderInjector');
    }])

    .factory('routeHistory', function () {

        var lastRoute;
        var lastPathParams;
        var lastQueryParams;

        function registerRoute(current) {
            if (current !== undefined) {
                lastRoute = current.originalPath;
                lastPathParams = current.pathParams;
                lastQueryParams = current.params;
            }
        }

        function getLastRoute() {
            var lastRouteWithPathParams = processWithPathParams();

            if (useQueryParams()) {
                return lastRouteWithPathParams + buildQueryParamString();
            }
            return lastRouteWithPathParams;
        }

        function processWithPathParams() {
            var pathWithParams = lastRoute;
            for (var param in lastPathParams) {
                var stringToReplace = ':' + param;
                pathWithParams = pathWithParams.replace(stringToReplace, lastPathParams[param]);
            }
            return pathWithParams;
        }

        function useQueryParams() {
            return lastQueryParams !== undefined && lastQueryParams.searchFor !== undefined;
        }

        function buildQueryParamString() {
            return '?searchFor=' + lastQueryParams.searchFor;
        }

        return {
            registerRoute: registerRoute,
            getLastRoute: getLastRoute
        };
    })
    .run(function ($rootScope, routeHistory) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            routeHistory.registerRoute(current);
        });
    });


