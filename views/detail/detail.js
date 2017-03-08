(function (angular) {
    'use strict';
    var app = angular.module('movicat.detail', ['ngRoute']);
    //配置路由规则
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/details/:id', {
            templateUrl: './views/detail/detail.html',
            controller: 'detailController'
        })
    }])
    app.controller('detailController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        var id = $routeParams.id;
        //console.log(id);
        $http.get('http://127.0.0.1/v2/movie/subject/' + id)
            .then(function (res) {
                $scope.movie = res.data;
            }, function (err) {
                console.log(err);
            })
    }])
})(angular)