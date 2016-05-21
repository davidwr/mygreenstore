(function () {
  'use strict';

  function MapController($scope, $stateParams, $ionicLoading, $compile) {
    var vm = this;

    vm.initialize = function () {
      var garden = $stateParams['garden']
      var pos = garden.location;
      var myLatlng = new google.maps.LatLng(pos.lat, pos.lng);

      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

      var contentString = "<div>" + garden.name + "</div>";
      var compiled = $compile(contentString)($scope);

      var infowindow = new google.maps.InfoWindow({
        content: compiled[0]
      });

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
      });

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
      });

      $scope.map = map;
    }

    vm.initialize();
  }

  angular.module('mgstore')
    .controller('MapController', ['$scope', '$stateParams', '$ionicLoading', '$compile', MapController]);

} ());