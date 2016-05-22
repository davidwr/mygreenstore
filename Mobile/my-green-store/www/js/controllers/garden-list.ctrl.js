(function () {
  'use strict';

  function GardenListController($scope, $state, GardenService, LocationService) {
    var vm = this;

    vm.determineDistances = function () {
      LocationService.getCurrentLocation().then(function (pos) {
        vm.gardens.forEach(function (garden) {
          garden.distance = LocationService.distanceTo(pos, garden.location);
        });
      });
    };

    vm.init = function () {
      GardenService.getCloseToMe().then(function (gardens) {
        vm.gardens = gardens;
        vm.determineDistances();
        $scope.$on('$ionicView.enter', vm.determineDistances);
      });
    };

    vm.details = function (garden) {
      $state.go('app.garden-detail', { id: garden.id, garden: garden });
    };

    vm.init();
  }

  angular.module('mgstore')
    .controller('GardenListController', ['$scope', '$state', 'GardenService', 'LocationService', GardenListController]);

} ());