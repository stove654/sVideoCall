angular.module('starter')

  .controller('LoginCtrl', function ($scope, $http, APP_CONFIG, localStorageService, $state) {

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
      $http.post(APP_CONFIG.baseUrl + 'users', $scope.data.newUser).then(function (response) {
        console.log(response)
      }, function (err) {
        console.log(err)
      });
    };

    $scope.login = function () {
      $http.post(APP_CONFIG.url + 'auth/local', $scope.data.user).then(function (response) {
        localStorageService.set('stoveCurrentUser', response.data);
        $state.go('app.home')
      }, function (err) {
        console.log(err)
      });
    }

  });

