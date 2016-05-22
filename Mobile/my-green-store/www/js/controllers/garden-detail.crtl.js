(function () {
  'use strict';

  function GardenDetailController($stateParams, $state, $scope, $ionicModal, GardenService, ProductService, CheckoutService) {
    var vm = this;

    $ionicModal.fromTemplateUrl('templates/modal/product-detail.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    vm.init = function () {

      vm.garden = $stateParams['garden'];

      if (!vm.garden) {
        GardenService.getGarden($stateParams['id']).then(function (garden) {
          vm.garden = garden;
        });
      }

      ProductService.getProducts($stateParams['id']).then(function (products) {
        vm.products = products;
      });
    };

    vm.showDetails = function (product) {
      $scope.product = product;
      $scope.modal.show();
    }

    vm.add = function () {
      if ($scope.product.qty > $scope.product.stock) {
        alert("Can't add more than " + $scope.product.stock + ".");
      } else {
        $scope.modal.hide();
      }
    }

    vm.buy = function () {
      $scope.login(function () {
        var selectedProducts = [];

        vm.products.forEach(function (prod) {
          if (prod.qty && prod.qty > 0) {
            selectedProducts.push(prod);
          }
        });

        if (selectedProducts.length) {
          CheckoutService.setProducts(selectedProducts);
          $state.go('app.checkout', { garden: vm.garden });
        } else {
          alert("You haven't selected any product!");
        }
      });
    }

    vm.init();
  }

  angular.module('mgstore')
    .controller('GardenDetailController', [
      '$stateParams',
      '$state',
      '$scope',
      '$ionicModal',
      'GardenService',
      'ProductService',
      'CheckoutService',
      GardenDetailController]);

} ());
