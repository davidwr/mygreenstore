(function () {
  'use strict';
  function CheckoutController($state, $stateParams, $scope, $ionicModal, $ionicHistory, CheckoutService) {
    var vm = this;

    $ionicModal.fromTemplateUrl('templates/modal/checkout-confirmation.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    vm.init = function () {
      vm.garden = $stateParams['garden'];
      vm.products = CheckoutService.getProducts();

      if(!vm.products)
        vm.goBack();
    };

    vm.confirm = function () {
      $scope.shipToMe = vm.ship;

      var order = {
        ship_type: vm.ship ? 'delivery' : 'pickup',
        seller: vm.garden.owner,
        items: []
      };

      if(vm.ship)
        order.ship_address = vm.ship_address;

      vm.products.forEach(function(product){
        order.items.push({
          price: product.price,
          quantity: product.qty,
          product_id: product.id
        });
      });

      CheckoutService.confirm(order).then(function (orderCreated) {
        orderCreated.garden = vm.garden;
        $scope.lastOrder = orderCreated;
        $scope.modal.show();
      });
    };

    vm.goBack = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.gardenlist');
      $scope.modal.hide();
    }

    vm.init();
  }

  angular.module('mgstore')
    .controller('CheckoutController', [
      '$state',
      '$stateParams',
      '$scope',
      '$ionicModal',
      '$ionicHistory',
      'CheckoutService',
      CheckoutController]);
} ());
