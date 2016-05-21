(function () {
  'use strict';
  function MyGardenEditController($state, $stateParams, $ionicHistory, GardenService) {
    var vm = this;

    vm.init = function () {
      vm.garden = $stateParams['garden'];
    };

    vm.changeAddress = function () {
      $state.go('app.mapaddress', { garden: vm.garden });
    };

    vm.save = function () {
      GardenService.save(vm.garden).then(function () {
        $ionicHistory.goBack();
      });
    };
    vm.init();
  }

  angular.module('mgstore')
    .controller('MyGardenEditController', ['$state', '$stateParams', '$ionicHistory', 'GardenService', MyGardenEditController]);
} ());