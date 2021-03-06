(function () {
  'use strict';
  function MyGardenEditController($state, $stateParams, $ionicHistory, GardenService, CameraService) {
    var vm = this;

    vm.init = function () {
      vm.garden = $stateParams['garden'];
    };

    vm.changeAddress = function () {
      $state.go('app.mapaddress', { garden: vm.garden });
    };

    vm.takePicture = function () {
      CameraService.getPicture().then(function (imageData) {
        vm.garden.photo = imageData;
      });
    };

    vm.save = function () {
      if (vm.garden.name && vm.garden.location && vm.garden.address) {
        GardenService.save(vm.garden).then(function () {
          $ionicHistory.goBack();
        });
      } else {
        alert('All fields are mandatory');
      }
    };
    vm.init();
  }

  angular.module('mgstore')
    .controller('MyGardenEditController', [
      '$state',
      '$stateParams',
      '$ionicHistory',
      'GardenService',
      'CameraService',
      MyGardenEditController]);
} ());