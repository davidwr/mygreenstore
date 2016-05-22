(function () {
  'use strict';

  function CameraService($q, $ionicActionSheet) {

    var service = {};

    var defaultOptions = {
      quality: 75,
      targetWidth: 320,
      targetHeight: 240,
      correctOrientation: true,
      cameraDirection: 0 //BACK
    }

    service.getPicture = function (options) {
      var q = $q.defer();

      if (!options) {
        options = defaultOptions;
      }

      var getPic = function () {
        navigator.camera.getPicture(function (result) {

          var gotFile = function (fileEntry) {
            fileEntry.file(function (file) {
              var reader = new FileReader();
              reader.onloadend = function (e) {
                var content = this.result;
                q.resolve(content);
              };
              reader.readAsDataURL(file);
            });
          };

          var fail = function (e) {
            alert('An error occurred while taking your picture.');
            q.reject(e);
          }

          window.resolveLocalFileSystemURL(result, gotFile, fail);
        }, function (err) {
          q.reject(err);
        }, options);
      }

      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Take Photo' },
          { text: 'Choose from Library' }
        ],
        cancelText: 'Cancel',
        buttonClicked: function (index) {
          if (index === 0) {
            options.sourceType = 1;
          } else {
            options.sourceType = 0;
          }
          getPic();
          return true;
        }
      });




      return q.promise;
    }

    return service;
  }

  angular.module('mgstore')
    .factory('CameraService', ['$q', '$ionicActionSheet', CameraService]);

} ());