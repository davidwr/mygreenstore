(function () {
  'use strict';
  function MyGardenController($state, GardenService, ProductService) {
    var vm = this;

    vm.init = function () {
      GardenService.getGarden('5741376161600f32ffeb3bcb').then(function (garden) {
        vm.garden = garden;
        return ProductService.getProducts(garden.id);
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
    .controller('MyGardenController', ['$state', 'GardenService', 'ProductService', MyGardenController]);
} ());