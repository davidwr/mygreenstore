(function () {
  'use strict';
  function OrderDetailController($state, $stateParams, $ionicHistory, OrderService) {
    var vm = this;

    vm.init = function () {
      vm.order = $stateParams['order'];
      vm.seller = $stateParams['seller'];
      vm.total = 0;
      vm.order.items.forEach(function (item) {
        console.log(item);
        vm.total += item.price * item.quantity;
      });
    };

    vm.complete = function () {
      OrderService.finish(vm.order).then(function () {
        $ionicHistory.goBack();
      });
    };

    vm.cancel = function () {
      OrderService.cancel(vm.order).then(function () {
        $ionicHistory.goBack();
      });
    };

    vm.init();
  }

  angular.module('mgstore')
    .controller('OrderDetailController', [
      '$state',
      '$stateParams',
      '$ionicHistory',
      'OrderService',
      OrderDetailController]);
} ());