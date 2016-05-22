(function () {
  'use strict';

  function toRad(value) {
    return value * Math.PI / 180;
  }

  function isValidCoordinate(coordinate) {
    return coordinate && coordinate[0] && coordinate[1];
  }

  function calculateDistance(from, to) {
    if (isValidCoordinate(from) && isValidCoordinate(to)) {
      var earthRadiusInKm = 6371;
      var x = (toRad(to[1]) - toRad(from[1])) *
        Math.cos((toRad(from[0]) + toRad(to[0])) / 2);
      var y = (toRad(to[0]) - toRad(from[0]));
      return Math.sqrt(x * x + y * y) * earthRadiusInKm;
    }

    return 0;
  }

  function LocationService($q) {

    var service = {};

    service.getCurrentLocation = function () {
      var d = $q.defer();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          service.location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          d.resolve(service.location);
        }, function () {
          d.reject();
        });
      } else {
        alert('Unable to determine your location');
        d.reject();
      }
      return d.promise;
    };

    service.distanceTo = function (fromPos, to) {
      return calculateDistance(
        [fromPos.lat, fromPos.lng],
        [to.lat, to.lng]);
    }

    return service;
  }

  angular.module('mgstore')
    .factory('LocationService', LocationService);

} ());