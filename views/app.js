/**
 * Created by admin on 2017/3/2.
 */
(function (angular){
    'use strict';
    //首先创建主模块
    var app = angular.module('movicat',['ngRoute',
        'movicat.home_page',//路由匹配顺序，新引入先匹配
        //'movicat.in_theaters',
        //'movicat.coming_soon',
        //'movicat.top_250',
        'movicat.movie_list',
        'movicat.detail'
    ]);
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.otherwise('/home_page');////匹配规则优先引用，优先匹配，最终都不匹配，匹配主模块
    }]);

    app.controller('mainController',['$scope','$route','$location',function($scope,$route,$location){
        $scope.search=function(){
            //http://api.douban.com/v2/movie/search?q=西游记
            //获取查询的内容
            var q=$scope.q;
            //把路由协定
            $location.url('/search?q='+q);
        }
        //检测锚点值改变
        $scope.selected=1;
        $scope.loc=$location;
        $scope.$watch('loc.url()',function(newV, oldV){
            if(newV==oldV) return;
            switch (newV){
                case '/home_page':
                    $scope.selected = 1;
                    break;
                case '/in_theaters':
                    $scope.selected = 2;
                    break;
                case '/coming_soon':
                    $scope.selected = 3;
                    break;
                case '/top250':
                    $scope.selected = 4;
                    break;
            }
        })
    }])
})(angular)