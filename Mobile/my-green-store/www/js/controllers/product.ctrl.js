(function () {
  'use strict';
  function ProductController($state, $stateParams, $ionicHistory, ProductService, CameraService) {
    var vm = this;

    vm.init = function () {
      vm.product = $stateParams['product'];
      if (!vm.product) {
        vm.product = {};
      }
    };

    vm.takePicture = function () {
      CameraService.getPicture().then(function (imageData) {
        vm.product.photo = imageData;
      });
    }

    vm.save = function () {
      ProductService.save(vm.product).then(function () {
        $ionicHistory.goBack();
      });
    };

    vm.init();
  }

  angular.module('mgstore')
    .controller('ProductController', [
      '$state',
      '$stateParams',
      '$ionicHistory',
      'ProductService',
      'CameraService',
      ProductController]);
} ());