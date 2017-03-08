/**
 * Created by admin on 2017/3/2.
 */
(function (angular) {
    'use strict';
    //创建正在热映子模块
    var app = angular.module('movicat.movie_list', ['ngRoute']);
    //声明路由规则
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:movieType', {
            templateUrl: './views/movie_list/movie_list.html',
            controller: 'movie_listController'
        })
    }])

    //要操作页面上的数据需要$scope
    //需要$scope就需要controller
    app.controller('movie_listController', ['$scope', '$http', '$routeParams',function ($scope, $http,$routeParams) {
        //根据页数显示数据
        $scope.showPage = function (pageNum) {
            //pageNum=2  当前页减1*显示数=起始记录数
            if(pageNum>$scope.totalPage){
                return;
            }
            pageNum = pageNum || 1;//如果你传递了值，我就根据当前页码数，否则就是1
            let count =15;
            let start = (pageNum - 1) * count;
            let url = 'http://127.0.0.1/v2/movie/'+$routeParams.movieType;
            url = url + '?start=' + start + '&count=' + count;
            if($routeParams.movieType === 'search'){//对于查询的情况
                url += '&q=' + $routeParams.q;
            }
            $http.get(url)
                .then(function (res) {
                    $scope.movies = res.data;
                    //console.log(res);
                    //$scope.viewCount = count;//定义显示数
                    $scope.currentPage = pageNum;//定义当前页数
                    //实现分页 总记录数/显示数，向上取整
                    $scope.totalPage = Math.ceil($scope.movies.total / count);//计算总页数
                },function (err) {
                    console.log(err);
                });
            //页面加载时执行该分页函数
        }
        $scope.showPage(1);//默认一开始显示
    }])
})(angular)