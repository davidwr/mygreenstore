(function () {
  'use strict';

  function MapController($stateParams, $ionicLoading, $compile, $ionicHistory, GardenService) {
    var vm = this;

    vm.initialize = function () {

      vm.showAddressBar = $stateParams['showAddressBar'];

      vm.garden = $stateParams['garden'];
      var pos = { lat: 49.2561054, lng: -123.1941245 };
      if (vm.garden.location) {
        pos = { lat: vm.garden.location[0], lng: vm.garden.location[1] };
      }
      var center = new google.maps.LatLng(pos.lat, pos.lng);

      var mapOptions = {
        center: center,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

      var contentString = "<div>" + vm.garden.name + "</div>";
      //var compiled = $compile(contentString)($scope);

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      vm.marker = new google.maps.Marker({
        position: center,
        map: map
      });

      google.maps.event.addListener(vm.marker, 'click', function () {
        infowindow.open(map, vm.marker);
      });

      if (vm.showAddressBar) {
        vm.geocoder = new google.maps.Geocoder();
        google.maps.event.addListener(map, 'center_changed', vm.centerMarker);
      }

      vm.map = map;
    }

    vm.centerMarker = function () {
      window.setTimeout(function () {
        var center = vm.map.getCenter();
        vm.marker.setPosition(center);
      }, 100);
    };

    vm.search = function () {
      vm.geocoder.geocode({ address: vm.garden.address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          vm.map.setCenter(results[0].geometry.location);
          vm.centerMarker();
        } else {
          alert('Address not found.');
        }
      })
    }

    vm.save = function () {
      var center = vm.map.getCenter();
      vm.garden.location = [center.lat(), center.lng()];
      if (!vm.garden.name) {
        vm.garden.name = (vm.garden.address? vm.garden.address : 'My ') + ' Store';
      }
      GardenService.save(vm.garden).then(function (savedGarden) {
        if (!vm.garden.id) {
          vm.garden.id = savedGarden.id;
        }
        $ionicHistory.goBack();
      });
    }

    vm.initialize();
  }

  angular.module('mgstore')
    .controller('MapController', [
      '$stateParams',
      '$ionicLoading',
      '$compile',
      '$ionicHistory',
      'GardenService',
      MapController]);

} ());