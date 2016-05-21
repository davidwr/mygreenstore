(function () {
  'use strict';
  function ProductController($state, $stateParams, $ionicHistory, ProductService) {
    var vm = this;

    vm.init = function () {
      vm.product = $stateParams['product'];
      if (!vm.product) {
        vm.product = {};
      }
    };

    vm.save = function () {
      ProductService.save(vm.product).then(function () {
        $ionicHistory.goBack();
      });
    }

    vm.init();
  }

  angular.module('mgstore')
    .controller('ProductController', ['$state', '$stateParams', '$ionicHistory', 'ProductService', ProductController]);
} ());