angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, localStorageService, $state) {

    $scope.logOut = function () {
      localStorageService.remove('stoveCurrentUser');
      $state.go('login');
    }
  })

