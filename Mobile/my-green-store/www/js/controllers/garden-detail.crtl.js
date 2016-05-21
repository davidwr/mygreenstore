(function () {
  'use strict';

  function GardenDetailController($stateParams, $state, $ionicModal, GardenService, ProductService) {
    var vm = this;

    vm.selectedProduct = {};

    $ionicModal.fromTemplateUrl('modal/product-detail.html', {
      scope: vm.selectedProduct,
      animation: 'slide-in-up'
    }).then(function (modal) {
      vm.modal = modal;
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
      vm.selectedProduct = product;
      vm.modal.show();
    }

    vm.buy = function () {
      $state.go('app.checkout', { id: vm.garden.id });
    }

    vm.init();
  }

  angular.module('mgstore')
    .controller('GardenDetailController', ['$stateParams', '$state', '$ionicModal', 'GardenService', 'ProductService', GardenDetailController]);

} ());