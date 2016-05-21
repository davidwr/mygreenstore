(function () {
  'use strict';

  function MainController(apiUrl, $scope, $ionicModal, $timeout, $cordovaOauth, $http) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};
    $scope.loginMessage = '';

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

      function onError(error, a, b) {
        console.log(error);
        console.log(a);
        console.log(b);
        $scope.loginMessage = 'Login error, please try again.'
      };

      function googleOAuth(callback) {
        $cordovaOauth.google("781562583420-jp5dnffk58hu8qa37jjb59mvnauaks2r.apps.googleusercontent.com", ["email"])
          .then(callback, function(error) { console.log('googleOAuth!'); return onError(error); });
      }

      function login(token, callback) {
        $http.get(apiUrl + '/login', { headers: { token: token }})
          .then(callback, function(error) { console.log('login!'); return onError(error); });
      }

      googleOAuth(function(result) {
        console.log('googleOAuth: ', result);

        login(result.access_token, function(response) {
          console.log('login response', response);

          if(!response.data.success)
            return onError();

          $scope.loginMessage = '';
          $scope.loginData = response.data.user.token;

          // TODO: save token in localstorage
          console.log(response);

          $scope.closeLogin();
        });
      });
    };
  }

  angular.module('mgstore')
    .controller('MainController', ['apiUrl', '$scope', '$ionicModal', '$timeout', '$cordovaOauth', '$http', MainController]);

} ());
