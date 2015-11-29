// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'starter.controllers',
  'ngCordova',
  'ngCordovaOauth',
  'LocalStorageModule',
  'pascalprecht.translate',
  'toaster',
  'ui.bootstrap',
  'satellizer',
  'angular-loading-bar'
])

  .run(function ($ionicPlatform, $rootScope, $state, $location, SessionService) {


    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

      var shouldLogin = toState.data !== undefined
        && toState.data.requireLogin
        && !SessionService.isToken().isLoggedIn ;

      // NOT authenticated - wants any private stuff
      if(shouldLogin)
      {
        $state.go('login');
        event.preventDefault();
        return;
      }

      // authenticated (previously) comming not to root main
      if(SessionService.isToken().isLoggedIn)
      {
        var shouldGoToMain = fromState.name === ""
          && toState.name !== "main.home" ;
        return;
      }

    });


    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/home.html',
            controller: 'HomeCtrl'
          }
        },
        data : {requireLogin : true }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

    $authProvider.httpInterceptor = function() { return true; };
    $authProvider.withCredentials = true;
    $authProvider.tokenRoot = null;
    $authProvider.cordova = false;
    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';
    $authProvider.unlinkUrl = '/auth/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'satellizer';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'];
    $httpProvider.interceptors.push('loaderInterceptor');

// Facebook
    $authProvider.facebook({
      redirectUri: 'http://localhost:8100',
      clientId: '895357913876223'
    });


  })

  .factory('loaderInterceptor', function($rootScope, $q, $location, localStorageService, $injector, cfpLoadingBar) {
    return {
      'request': function(config) {
        // do something on success
        cfpLoadingBar.start();
        return config;
      },

      // optional method
      'response': function(response) {
        // do something on success
        cfpLoadingBar.complete()
        return response;
      },

      'responseError' : function(response){
        cfpLoadingBar.complete()
        if (response.status == 401) {
          var state = $injector.get('$state');
          localStorageService.remove('stoveCurrentUser');
          state.go('login');
        }
        return $q.reject(response);
      }
    };

  })
