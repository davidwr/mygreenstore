(function () {
  'use strict';

  function OrderService($q) {

    var statusMap = {
      pending: 'Pending',
      canceled: 'Cancelled',
      finished: 'Completed'
    };

    var service = {};

    var fakeListSold = [
      {
        id: 0,
        number: 1,
        date: new Date().toISOString(),
        status: 'pending',
        items: [{
          price: 12.9,
          quantity: 10,
          product: {
            id: 0,
            name: 'Carrots',
            stock: 150
          }
        }, {
            price: 12.9,
            quantity: 10,
            product: {
              id: 1,
              name: 'Apples',
              stock: 50
            }
          }
        ]
      }, {
        id: 1,
        number: 2,
        date: new Date().toISOString(),
        status: 'canceled',
        items: [{
          price: 12.9,
          quantity: 10,
          product: {
            id: 0,
            name: 'Carrots',
            stock: 150
          }
        }, {
            price: 12.9,
            quantity: 10,
            product: {
              id: 1,
              name: 'Apples',
              stock: 50
            }
          }
        ]
      }, {
        id: 2,
        number: 3,
        date: new Date().toISOString(),
        status: 'finished',
        items: [{
          price: 12.9,
          quantity: 10,
          product: {
            id: 0,
            name: 'Carrots',
            stock: 150
          }
        }, {
            price: 12.9,
            quantity: 10,
            product: {
              id: 1,
              name: 'Apples',
              stock: 50
            }
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
        items: [{
          price: 12.9,
          quantity: 10,
          product: {
            id: 0,
            name: 'Carrots',
            stock: 150
          }
        }, {
            price: 12.9,
            quantity: 10,
            product: {
              id: 1,
              name: 'Apples',
              stock: 50
            }
          }
        ]
      }, {
        id: 1,
        number: 23,
        date: new Date().toISOString(),
        status: 'canceled',
        items: [{
          price: 12.9,
          quantity: 10,
          product: {
            id: 0,
            name: 'Carrots',
            stock: 150
          }
        }, {
            price: 12.9,
            quantity: 10,
            product: {
              id: 1,
              name: 'Apples',
              stock: 50
            }
          }
        ]
      }, {
        id: 2,
        number: 31,
        date: new Date().toISOString(),
        status: 'finished',
        items: [{
          price: 12.9,
          quantity: 10,
          product: {
            id: 0,
            name: 'Carrots',
            stock: 150
          }
        }, {
            price: 12.9,
            quantity: 10,
            product: {
              id: 1,
              name: 'Apples',
              stock: 50
            }
          }
        ]
      }
    ];

    service.mapLabels = function (list) {
      list.forEach(function (order) {
        order.statusLabel = statusMap[order.status];
      });
    }

    service.getSold = function () {
      service.mapLabels(fakeListSold);
      return $q(function (resolve) {
        resolve(fakeListSold);
      });
    };

    service.getBought = function () {
      service.mapLabels(fakeListBought);
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