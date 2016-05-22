(function () {
  'use strict';
  function MyOrdersController($scope, $state, OrderService, LocalStorageService) {
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
      $scope.login(function () {
        OrderService.getMyOrders().then(function(orders) {
          var user = LocalStorageService.get('user');
          OrderService.mapLabels(orders);

          vm.soldItems = _.filter(orders, function(order) { return order.seller == user.id; });
          vm.populateClass(vm.soldItems);

          vm.boughtItems = _.filter(orders, function(order) { return order.customer == user.id; });
          vm.populateClass(vm.boughtItems);
        });
      });
    };

    vm.details = function (order) {
      $state.go('app.order-detail', { order: order });
    }

    vm.init();
  }

  angular.module('mgstore')
    .controller('MyOrdersController', ['$scope', '$state', 'OrderService', 'LocalStorageService', MyOrdersController]);
} ());
