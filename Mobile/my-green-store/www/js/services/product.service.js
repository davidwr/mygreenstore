(function () {
  'use strict';

  function ProductService(Restangular) {

    var service = {};

    service.getProducts = function (gardenId) {
      return Restangular.one('garden', gardenId).getList('product');
    };

    service.save = function (product) {
      if (product.id) {
        return Restangular.one('product', product.id).customPUT(product);
      } else {
        return Restangular.all('product').post(product);
      }
    };

    service.remove = function (product) {
      return Restangular.one('product', product.id).remove();
    };

    return service;
  }

  angular.module('mgstore')
    .factory('ProductService', ['Restangular', ProductService]);

} ());
