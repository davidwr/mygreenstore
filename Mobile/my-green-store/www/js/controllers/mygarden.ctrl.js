(function () {
  'use strict';
  function MyGardenController($state, GardenService, ProductService) {
    var vm = this;

    vm.init = function () {
      GardenService.getGarden(0).then(function (garden) {
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

    vm.init();
  }

  angular.module('mgstore')
    .controller('MyGardenController', ['$state', 'GardenService', 'ProductService', MyGardenController]);
} ());