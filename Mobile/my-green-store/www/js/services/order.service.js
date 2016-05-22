(function () {
  'use strict';

  function OrderService(Restangular, $q) {

    var statusMap = {
      pending: 'Pending',
      canceled: 'Cancelled',
      finished: 'Completed'
    };

    var service = {};

    service.mapLabels = function (list) {
      list.forEach(function (order) {
        order.statusLabel = statusMap[order.status];
      });
    }

    service.getMyOrders = function () {
      return Restangular.all('order').getList();
    };

    service.save = function (order) {
      return $q(function (resolve) {
        resolve(order);
      });
    }

    service.finish = function (order) {
      order.status = 'finished';
      return service.save(order);
    };

    service.cancel = function (order) {
      order.status = 'canceled';
      return service.save(order);
    }

    return service;
  }

  angular.module('mgstore')
    .factory('OrderService', OrderService);

} ());
