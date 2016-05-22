(function () {
  'use strict';

  function ProductService(Restangular, $q) {

    var service = {};
    var fakeList = [
      {
        id: 0,
        name: 'Carrots',
        stock: 150,
        photo: ''
      }, {
        id: 1,
        name: 'Apples',
        stock: 50
      }
    ];

    service.getProducts = function (gardenId) {
      return Restangular.one('garden', gardenId).getList('product');
    };

    service.save = function(product) {
      return $q(function(resolve) {
        if (!product.id) {
          product.id = new Date().getTime();
          fakeList.push(product);
        }

        resolve(product);
      });
    };

    service.remove = function(product) {
      return $q(function(resolve) {
        resolve();
      });
    };

    return service;
  }

  angular.module('mgstore')
    .factory('ProductService', ProductService);

} ());
