angular.module('starter')

  .controller('LoginCtrl', function ($scope) {

    $scope.data = {};
    $scope.data.user = {
      email: 'loi@hottab.net',
      password: '123456'
    };

    $scope.login = function () {
      console.log('login')
    }

  });

