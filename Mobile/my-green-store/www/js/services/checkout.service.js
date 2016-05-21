(function () {
  'use strict';

  function CheckoutService($q) {

    var service = {};
    
    service.setProducts = function(products) {
      service.products = products;
    }

    service.getProducts = function () {
      return service.products;
    };
    
    service.confirm = function() {
      var d = $q.defer();
      d.resolve({number: 1, deliveryDays: 3});      
      return d.promise;
    }

    return service;
  }

  angular.module('mgstore')
    .factory('CheckoutService', CheckoutService);

} ());