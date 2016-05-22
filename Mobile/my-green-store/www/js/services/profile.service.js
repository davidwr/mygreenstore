(function () {
  'use strict';

  function ProfileService(Restangular) {

    var service = {};

    service.get = function (id) {
      return Restangular.one('profile').getList();
    };

    service.save = function (profile) {
      if (profile.put) {
        return Restangular.one('profile', profile.id).customPUT(profile);
      } else {
        return Restangular.all('profile').post(profile);
      }
    };

    return service;
  }

  angular.module('mgstore')
    .factory('ProfileService', ['Restangular', ProfileService]);

} ());
