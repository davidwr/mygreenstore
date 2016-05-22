(function () {
  'use strict';

  function MainController($scope, $state, $ionicModal, LoginService) {
    var main = this;

    main.loginMessage = '';
    main.loginCb = function () { };

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.loginModal = modal;
    });

    main.closeLogin = function () {
      $scope.loginModal.hide();
    };

    $scope.login = function (cb) {
      if (LoginService.getUser()) {
        cb();
      } else {
        main.loginCb = cb;
        $scope.loginModal.show();
      }
    };

    main.doLogin = function () {
      LoginService.authenticate().then(function (user) {
        main.closeLogin();
        main.loginCb();
      }).catch(function () {
        main.loginMessage = 'Login error, please try again.';
      });
    };

    main.goToProfile = function () {
      $scope.login(function () {
        $state.go('app.profile');
      });
    }
  }

  angular.module('mgstore')
    .controller('MainController', [
      '$scope',
      '$state',
      '$ionicModal',
      'LoginService',
      MainController]);

} ());
