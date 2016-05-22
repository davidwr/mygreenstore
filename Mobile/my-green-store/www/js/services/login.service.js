(function () {
  'use strict';

  function LoginService(baseUrl, $cordovaOauth, Restangular, LocalStorageService) {

    var clientId = "781562583420-jp5dnffk58hu8qa37jjb59mvnauaks2r.apps.googleusercontent.com";
    var service = {};

    function onError(where, error) {
      $scope.loginMessage = 'Login error, please try again.'
    };

    service.authenticate = function () {
      return $cordovaOauth.google(clientId, ["email"]).then(function (result) {
        Restangular.setDefaultHeaders({
          token: result.access_token
        });

        return Restangular.oneUrl('login', baseUrl + '/login').get().then(function (user) {
          LocalStorageService.set('user', user);
          LocalStorageService.set('token', result.access_token);
          return user;
        });
      });
    };

    service.getUser = function () {
      service.setHeaders();
      return LocalStorageService.get('user');
    };

    service.setHeaders = function() {
      var token = LocalStorageService.get('token');
      if (token) {
        Restangular.setDefaultHeaders({
          token: token
        });
      }
    };
    
    service.logout = function() {
      LocalStorageService.remove('user');
      LocalStorageService.remove('token');
    }

    return service;
  }

  angular.module('mgstore')
    .factory('LoginService', [
      'baseUrl',
      '$cordovaOauth',
      'Restangular',
      'LocalStorageService',
      LoginService]);

} ());
