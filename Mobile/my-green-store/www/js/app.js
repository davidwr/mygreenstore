(function () {
  'use strict';

  function run($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html'
          }
        }
      })
      .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })
      .state('app.gardenlist', {
        url: '/gardenlist',
        views: {
          'menuContent': {
            templateUrl: 'templates/garden-list.html',
            controller: 'GardenListController as vm'
          }
        }
      })
      .state('app.garden-detail', {
        url: '/garden/:id',
        params: {
          garden: null
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/garden-detail.html',
            controller: 'GardenDetailController as vm'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/gardenlist');
  }

  angular.module('mgstore', ['ionic'])
    .config(['$stateProvider', '$urlRouterProvider', config])
    .run(['$ionicPlatform', run])

}());