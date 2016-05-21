(function () {
  'use strict';

  function GardenService($q) {

    var service = {};
    var fakeList = [
      {
        id: 0,
        name: 'Garden 1',
        address: 'Garden St. 1500'
      }, {
        id: 1,
        name: 'Garden 2',
        address: 'Garden 2 St. 1100'
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