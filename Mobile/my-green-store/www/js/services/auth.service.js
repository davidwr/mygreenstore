(function () {
  'use strict';

  function AuthService($q) {

    var service = {};

    service.login = function () {
      return {};
    };

    return service;
  }

  angular.module('mgstore')
    .factory('AuthService', AuthService);

} ());
