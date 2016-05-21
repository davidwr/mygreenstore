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
    };

    vm.confirm = function () {
      $scope.shipToMe = vm.ship;
      CheckoutService.confirm().then(function (order) {
        $scope.order = order;
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