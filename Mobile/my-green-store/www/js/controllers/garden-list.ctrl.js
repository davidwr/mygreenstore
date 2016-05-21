(function () {
  'use strict';

  function GardenListController($state, GardenService) {
    var vm = this;

    vm.init = function () {
      GardenService.getCloseToMe().then(function(gardens) {
        vm.gardens = gardens;  
      });
    };
    
    vm.details = function(garden) {
      $state.go('app.garden-detail', {id: garden.id, garden: garden});
    };

    vm.init();
  }

  angular.module('mgstore')
    .controller('GardenListController', ['$state', 'GardenService', GardenListController]);

} ());