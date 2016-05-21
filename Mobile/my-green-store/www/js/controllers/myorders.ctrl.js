(function () {
  'use strict';
  function MyOrdersController($state, OrderService) {
    var vm = this;

    vm.init = function () {
      OrderService.getSold().then(function (soldItems) {
        vm.soldItems = soldItems;
      });
      OrderService.getBought().then(function (boughtItems) {
        vm.boughtItems = boughtItems;
      });
    };

    vm.details = function (order) {
      $state.go('app.order-detail', { order: order });
    }

    vm.init();
  }

  angular.module('mgstore')
    .controller('MyOrdersController', ['$state', 'OrderService', MyOrdersController]);
} ());