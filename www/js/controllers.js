angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('PlaylistsCtrl', function ($scope, $cordovaDevice, $cordovaOauth, $http) {
    document.addEventListener("deviceready", function () {

      var device = $cordovaDevice.getDevice();

      var cordova = $cordovaDevice.getCordova();

      var model = $cordovaDevice.getModel();

      var platform = $cordovaDevice.getPlatform();

      var uuid = $cordovaDevice.getUUID();

      var version = $cordovaDevice.getVersion();

      console.log(device, cordova, model, platform, uuid, version)

    }, false);

    $scope.facebookLogin = function () {
      console.log('login facebook')
      $cordovaOauth.facebook(895357913876223, ["email", "public_profile"]).then(function (result) {
        $http.get("https://graph.facebook.com/v2.2/me", {
          params: {
            access_token: result.access_token,
            fields: "name,gender,location,picture",
            format: "json"
          }
        }).then(function (result) {
          console.log(result);
        }, function (error) {

        });

      }, function (error) {
        console.log(error)
        // error
      });
    }

    function displayDataFacebook(access_token) {

    }
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
