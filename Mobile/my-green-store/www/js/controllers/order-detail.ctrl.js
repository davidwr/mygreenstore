(function () {
  'use strict';
  function OrderDetailController($state, $stateParams, $ionicHistory, OrderService, LocalStorageService) {
    var vm = this;

    vm.init = function () {
      vm.order = $stateParams['order'];

      if(!vm.order) {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });

        return $state.go('app.myorders');
      }

      vm.total = 0;
      vm.order.items.forEach(function (item) {
        vm.total += item.price * item.quantity;
      });
    };

    vm.isDelivery = function () {
       return vm.order.ship_type == 'delivery';
    };

    vm.isNotDelivery = function () {
      return !vm.isDelivery();
    };

    vm.isSeller = function () {
      var user = LocalStorageService.get('user');
      return vm.order.seller.id == user.id;
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
