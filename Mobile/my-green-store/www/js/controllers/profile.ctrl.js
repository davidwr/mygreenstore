(function () {
  'use strict';
  function ProfileController($state, CameraService) {
    var vm = this;

    vm.init = function () {
      vm.profile = {};
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

    };

    vm.init();
  }

  angular.module('mgstore')
    .controller('ProfileController', ['$state', 'CameraService', ProfileController]);
} ());