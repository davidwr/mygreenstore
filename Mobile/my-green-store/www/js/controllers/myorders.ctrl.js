(function () {
  'use strict';
  function MyOrdersController($state, OrderService) {
    var vm = this;

    vm.populateClass = function(list) {
      list.forEach(function(item) {
        switch(item.status) {
          case 'pending': item.statusClass = 'button-dark'; break;
          case 'canceled': item.statusClass = 'button-assertive'; break;
          case 'finished': item.statusClass = 'button-balanced'; break;
        }
      })
    };

    vm.init = function () {
      OrderService.getSold().then(function (soldItems) {
        vm.soldItems = soldItems;
        vm.populateClass(vm.soldItems);
      });
      OrderService.getBought().then(function (boughtItems) {
        vm.boughtItems = boughtItems;
        vm.populateClass(vm.boughtItems);
      });
    };

    vm.details = function (order, seller) {
      $state.go('app.order-detail', { order: order, seller: seller });
    }

    vm.init();
  }

  angular.module('mgstore')
    .controller('MyOrdersController', ['$state', 'OrderService', MyOrdersController]);
} ());