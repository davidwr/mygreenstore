(function () {
  'use strict';

  function ProfileService(Restangular) {

    var service = {};

    service.getCloseToMe = function (pos) {
      return Restangular.all('garden').getList({
        latitude: pos.lat,
        longitude: pos.lng,
        max_distance: 100000000
      });
    };

    service.get = function (id) {
      return Restangular.one('profile').get();
    };

    service.save = function (profile) {
      if (profile.put) {
        return profile.put();
      } else {
        return Restangular.all('profile').post(profile);
      }
    };

    return service;
  }

  angular.module('mgstore')
    .factory('ProfileService', ['Restangular', ProfileService]);

} ());
