(function () {
  'use strict';
  function ProfileController($state, $ionicHistory, CameraService, ProfileService) {
    var vm = this;

    vm.init = function () {
      ProfileService.get().then(function (profile) {
        vm.profile = {};
        if (profile) {
          vm.profile = profile;
        }
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

    vm.init();
  }

  angular.module('mgstore')
    .controller('ProfileController', [
      '$state',
      '$ionicHistory',
      'CameraService',
      'ProfileService',
      ProfileController]);
} ());