(function () {
  'use strict';
  function OrderDetailController($state, $stateParams, $ionicHistory, OrderService, LocalStorageService) {
    var vm = this;

    vm.init = function () {
      var user = LocalStorageService.get('user');

      vm.order = $stateParams['order'];
      vm.isSeller = vm.order.seller == user.id;

      vm.total = 0;
      vm.order.items.forEach(function (item) {
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
      'LocalStorageService',
      OrderDetailController]);
} ());
