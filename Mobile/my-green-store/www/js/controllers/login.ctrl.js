(function () {
  'use strict';

  function LoginController($state, AuthService) {
    var vm = this;

    vm.init = function () {
      AuthService.login();
    };

    vm.init();
  }

  angular.module('mgstore')
    .controller('LoginController', ['$state', 'AuthService', LoginController]);

} ());
