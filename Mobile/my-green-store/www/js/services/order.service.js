(function () {
  'use strict';

  function OrderService($q) {

    var statusMap = {
      penging: 'Pending',
      canceled: 'Cancelled',
      finished: 'Completed'
    }

    var service = {};

    var fakeListSold = [
      {
        id: 0,
        number: 1,
        date: new Date().toISOString(),
        status: 'pending',
        products: [
          {
            id: 0,
            name: 'Carrots',
            stock: 150
          }, {
            id: 1,
            name: 'Apples',
            stock: 50
          }
        ]
      }, {
        id: 1,
        number: 2,
        date: new Date().toISOString(),
        status: 'cancelled',
        products: [
          {
            id: 0,
            name: 'Carrots',
            stock: 150
          }, {
            id: 1,
            name: 'Apples',
            stock: 50
          }
        ]
      }, {
        id: 2,
        number: 3,
        date: new Date().toISOString(),
        status: 'finished',
        products: [
          {
            id: 0,
            name: 'Carrots',
            stock: 150
          }, {
            id: 1,
            name: 'Apples',
            stock: 50
          }
        ]
      }
    ];

    var fakeListBought = [
      {
        id: 0,
        number: 12,
        date: new Date().toISOString(),
        status: 'pending',
        products: [
          {
            id: 0,
            name: 'Carrots',
            stock: 150
          }, {
            id: 1,
            name: 'Apples',
            stock: 50
          }
        ]
      }, {
        id: 1,
        number: 23,
        date: new Date().toISOString(),
        status: 'cancelled',
        products: [
          {
            id: 0,
            name: 'Carrots',
            stock: 150
          }, {
            id: 1,
            name: 'Apples',
            stock: 50
          }
        ]
      }, {
        id: 2,
        number: 31,
        date: new Date().toISOString(),
        status: 'finished',
        products: [
          {
            id: 0,
            name: 'Carrots',
            stock: 150
          }, {
            id: 1,
            name: 'Apples',
            stock: 50
          }
        ]
      }
    ];

    service.getSold = function () {
      return $q(function (resolve) {
        resolve(fakeListSold);
      });
    };

    service.getBought = function () {
      return $q(function (resolve) {
        resolve(fakeListBought);
      });
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