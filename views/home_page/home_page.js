/**
 * Created by admin on 2017/3/2.
 */
(function (angular){
    'use strict';
    //声明自己是一个模块
    var app = angular.module('movicat.home_page',['ngRoute']);
    //home_page这个模块属于movicat的子模块

    //配置这个子模块的功能

    //配置路由规则
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/home_page',{
            templateUrl:'./views/home_page/home_page.html'
        })
    }])

   /* app.controller('mc',['$scope',function($scope){

    }])*/

})(angular)