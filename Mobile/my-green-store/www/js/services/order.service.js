(function () {
  'use strict';

  function OrderService(Restangular, $q) {

    var statusMap = {
      pending: 'Pending',
      canceled: 'Cancelled',
      closed: 'Completed'
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
      return Restangular.one('order', order.id).one('status').customPUT({ status: order.status });
    }

    service.finish = function (order) {
      order.status = 'closed';
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
