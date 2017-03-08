/**
 * Created by admin on 2017/3/2.
 */
(function (angular) {
    'use strict';
    //����������ӳ��ģ��
    var app = angular.module('movicat.movie_list', ['ngRoute']);
    //����·�ɹ���
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:movieType', {
            templateUrl: './views/movie_list/movie_list.html',
            controller: 'movie_listController'
        })
    }])

    //Ҫ����ҳ���ϵ�������Ҫ$scope
    //��Ҫ$scope����Ҫcontroller
    app.controller('movie_listController', ['$scope', '$http', '$routeParams',function ($scope, $http,$routeParams) {
        //����ҳ����ʾ����
        $scope.showPage = function (pageNum) {
            //pageNum=2  ��ǰҳ��1*��ʾ��=��ʼ��¼��
            if(pageNum>$scope.totalPage){
                return;
            }
            pageNum = pageNum || 1;//����㴫����ֵ���Ҿ͸��ݵ�ǰҳ�������������1
            let count =15;
            let start = (pageNum - 1) * count;
            let url = 'http://127.0.0.1/v2/movie/'+$routeParams.movieType;
            url = url + '?start=' + start + '&count=' + count;
            if($routeParams.movieType === 'search'){//���ڲ�ѯ�����
                url += '&q=' + $routeParams.q;
            }
            $http.get(url)
                .then(function (res) {
                    $scope.movies = res.data;
                    //console.log(res);
                    //$scope.viewCount = count;//������ʾ��
                    $scope.currentPage = pageNum;//���嵱ǰҳ��
                    //ʵ�ַ�ҳ �ܼ�¼��/��ʾ��������ȡ��
                    $scope.totalPage = Math.ceil($scope.movies.total / count);//������ҳ��
                },function (err) {
                    console.log(err);
                });
            //ҳ�����ʱִ�и÷�ҳ����
        }
        $scope.showPage(1);//Ĭ��һ��ʼ��ʾ
    }])
})(angular)