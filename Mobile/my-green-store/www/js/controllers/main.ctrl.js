(function () {
  'use strict';

  function MainController(baseUrl, $scope, $ionicModal, $timeout, $cordovaOauth, $http, LocalStorageService) {
    $scope.user = LocalStorageService.get('user');
    $scope.loginMessage = '';

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    $scope.login = function () {
      $scope.modal.show();
    };

    $scope.doLogin = function () {
      function onError(where, error) {
        console.log(where);
        console.log(error);
        $scope.loginMessage = 'Login error, please try again.'
      };

      function googleOAuth(callback) {
        var clientId = "781562583420-jp5dnffk58hu8qa37jjb59mvnauaks2r.apps.googleusercontent.com";
        $cordovaOauth.google(clientId, ["email"])
          .then(callback, function(error) { return onError('googleOAuth', error); });
      }

      function login(token, callback) {
        $http.get(baseUrl + 'login', { headers: { token: token }})
          .then(callback, function(error) { return onError('login: ', error); });
      }

      googleOAuth(function(result) {
        console.log(result);

        login(result.access_token, function(response) {
          if(!response.data.success)
            return onError('final: ', response);

          console.log(response);

          $scope.loginMessage = '';
          LocalStorageService.set('user', response.data.user);
          $scope.user = LocalStorageService.get('user');
          $scope.closeLogin();
        });
      });
    };
  }

  angular.module('mgstore')
    .controller('MainController', ['baseUrl', '$scope', '$ionicModal', '$timeout',
      '$cordovaOauth', '$http', 'LocalStorageService', MainController]);

} ());
