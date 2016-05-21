(function () {
  'use strict';

  function GardenService($q) {

    var service = {};
    var fakeList = [
      {
        id: 0,
        name: 'Garden 1',
        address: 'Garden St. 1500',
        location: { lat: 49.2562175, lng: -123.1941248 }
      }, {
        id: 1,
        name: 'Garden 2',
        address: 'Garden 2 St. 1100',
        location: { lat: 43.7184034, lng: -79.5184849 }
      }
    ];

    service.getCloseToMe = function () {
      return $q(function (resolve) {
        resolve(fakeList)
      });
    };

    service.getGarden = function (id) {
      return $q(function (resolve) {
        resolve(fakeList[id]);
      });
    };

    return service;
  }

  angular.module('mgstore')
    .factory('GardenService', GardenService);

} ());