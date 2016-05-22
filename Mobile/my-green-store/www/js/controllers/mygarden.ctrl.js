(function () {
  'use strict';
  function MyGardenController($state, $ionicHistory, GardenService, ProductService) {
    var vm = this;

    vm.init = function () {
      vm.garden = {};
      vm.loading = true;
      GardenService.getMyGarden().then(function (gardens) {
        if (gardens.length) {
          vm.garden = gardens[0];
          vm.loading = false;
          return ProductService.getProducts(vm.garden.id);
        } else {
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.mygarden-edit', { garden: {} });
          return null;
        }

      }).then(function (products) {
        vm.products = products;
      });
    };

    vm.edit = function (garden) {
      $state.go('app.mygarden-edit', { garden: garden });
    };

    vm.editProduct = function (product) {
      $state.go('app.product', { product: product });
    };

    vm.remove = function (product, $event) {
      $event.stopPropagation();
      if (confirm('Do you really want to remove ' + product.name + '?')) {
        ProductService.remove(product).then(function () {
          return ProductService.getProducts(vm.garden.id);
        }).then(function (products) {
          vm.products = products;
        });
      }
    };

    vm.init();
  }

  angular.module('mgstore')
    .controller('MyGardenController', ['$state', '$ionicHistory', 'GardenService', 'ProductService', MyGardenController]);
} ());