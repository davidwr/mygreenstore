(function () {
  'use strict';

  function CheckoutService(Restangular, $q) {

    var service = {};

    service.setProducts = function(products) {
      service.products = products;
    }

    service.getProducts = function () {
      return service.products;
    };

    service.confirm = function(newOrder) {
      return Restangular.all('order').post(newOrder);
    }

    return service;
  }

  angular.module('mgstore')
    .factory('CheckoutService', CheckoutService);

} ());
