(function () {
  'use strict';
  function ProfileController($scope, $state, $ionicHistory, CameraService, ProfileService) {
    var vm = this;

    vm.loading = true;

    vm.init = function () {
      vm.loading = true;
      ProfileService.get().then(function (profiles) {
        vm.profile = {};
        if (profiles.length) {
          vm.profile = profiles[0];
        }
        vm.loading = false;
      });
    };

    vm.takePicture = function () {
      var options = {
        quality: 75,
        targetWidth: 640,
        targetHeight: 480,
        correctOrientation: true,
        sourceType: 1, // CAMERA
        cameraDirection: 1 //FRONT
      }
      CameraService.getPicture(options).then(function (imageData) {
        vm.profile.photo = imageData;
      });
    }

    vm.save = function () {
      ProfileService.save(vm.profile).then(function () {
        $ionicHistory.goBack();
      });
    };

    $scope.$on('$ionicView.enter', vm.init);
  }

  angular.module('mgstore')
    .controller('ProfileController', [
      '$scope',
      '$state',
      '$ionicHistory',
      'CameraService',
      'ProfileService',
      ProfileController]);
} ());