(function () {
  'use strict';

  function GardenListController($scope, $state, GardenService, LocationService) {
    var vm = this;

    vm.determineDistances = function () {
      LocationService.getCurrentLocation().then(function (pos) {
        vm.gardens.forEach(function (garden) {
          garden.distance = LocationService.distanceTo(pos, { lat: garden.location[0], lng: garden.location[1] });
        });
      });
    };

    vm.init = function () {
      LocationService.getCurrentLocation().then(function (pos) {
        GardenService.getCloseToMe(pos).then(function (gardens) {
          vm.gardens = gardens;
          vm.determineDistances();
          $scope.$on('$ionicView.enter', vm.determineDistances);
        });
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
