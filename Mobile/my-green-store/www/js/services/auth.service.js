(function () {
  'use strict';

  function AuthService($q, apiUrl, $http) {

    var service = {};

    service.login = function (done) {
      $http.get(apiUrl + '/login')
        .then(function successCallback(response) {
          console.log(response)
        }, function errorCallback(response) {
          console.log(response)
        });
    };

    return service;
  }

  angular.module('mgstore')
    .factory('AuthService', ['$q', 'apiUrl', '$http', AuthService]);

} ());
