(function () {
  'use strict';

  function GardenService(Restangular) {

    var service = {};

    service.getCloseToMe = function (pos) {
      return Restangular.all('garden').getList({
        latitude: pos.lat,
        longitude: pos.lng,
        max_distance: 100000000
      });
    };

    service.getGarden = function (id) {
      return Restangular.one('garden', id).get();
    };

    service.save = function (garden) {
      if (garden.id) {
        return Restangular.one('garden', garden.id).customPUT(garden);
      } else {
        return Restangular.all('garden').post(garden);
      }
    };
    
    service.getMyGarden = function() {
      return Restangular.all('mygarden').getList();
    };

    return service;
  }

  angular.module('mgstore')
    .factory('GardenService', ['Restangular', GardenService]);

} ());
