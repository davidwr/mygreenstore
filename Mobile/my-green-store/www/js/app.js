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
        controller: 'MainController'
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
      })
      .state('app.checkout', {
        url: '/checkout',
        params: {
          garden: null
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/checkout.html',
            controller: 'CheckoutController as vm'
          }
        }
      })
      .state('app.map', {
        url: '/map',
        params: {
          garden: null
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/map.html',
            controller: 'MapController as vm'
          }
        }
      })
      .state('app.myorders', {
        url: '/myorders',
        views: {
          'menuContent': {
            templateUrl: 'templates/myorders.html',
            controller: 'MyOrdersController as vm'
          }
        }
      })
      .state('app.mygarden', {
        url: '/mygarden',
        views: {
          'menuContent': {
            templateUrl: 'templates/mygarden.html',
            controller: 'MyGardenController as vm'
          }
        }
      });

    $urlRouterProvider.otherwise('/app/gardenlist');
  }

  angular.module('mgstore', ['ionic'])
    .config(['$stateProvider', '$urlRouterProvider', config])
    .run(['$ionicPlatform', run])

}());