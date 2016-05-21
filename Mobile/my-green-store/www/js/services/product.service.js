(function () {
  'use strict';

  function ProductService($q) {

    var service = {};
    var fakeList = [
      {
        id: 0,
        name: 'Carrots',
        stock: 150
      }, {
        id: 1,
        name: 'Apples',
        stock: 50
      }
    ];

    service.getProducts = function (gardenId) {
      return $q(function (resolve) {
        resolve(fakeList)
      });
    };

    return service;
  }

  angular.module('mgstore')
    .factory('ProductService', ProductService);

} ());