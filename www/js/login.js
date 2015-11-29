angular.module('starter')

  .controller('LoginCtrl', function ($scope, $auth, $ionicPopup) {

    /*
    * id view
    * sign in: 1
    * sign up: 2
    * forgot password: 3
    * */

    $scope.data = {};
    $scope.data.view = 1;
    $scope.data.user = {
      email: 'loi@hottab.net',
      password: '123456'
    };

    $scope.data.newUser = {};
    $scope.data.forgot = {};

    $scope.viewLogin = function (id) {
      $scope.data.view = id;
    };

    $scope.signUp = function () {
      console.log('dang ky');
    }

    $scope.login = function () {

    }

  });

