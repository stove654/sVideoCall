'use strict';

/**
 * @ngdoc service
 * @name starter.session
 * @description
 * # session
 * Service in the starter.
 */
angular.module('starter')
  .service('SessionService', function (localStorageService) {

    var session = {};

    session.isToken = function () {
      var isLoggedIn = false;
      if (localStorageService.get('stoveCurrentUser')) {
        var user = localStorageService.get('stoveCurrentUser');
        if (user.token) {
          isLoggedIn = true;
        }
      }
      return {
        isLoggedIn: isLoggedIn
      };
    };

    return session;
  });