(function () {
  'use strict';

  var baseUrl = 'http://mygreenstore-allclothes.rhcloud.com/';
  var apiUrl = baseUrl + 'api/v1/';

  function run($ionicPlatform, LoginService) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
    });
    LoginService.setHeaders();
  }

  function config($stateProvider, $urlRouterProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl(apiUrl);

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MainController as main'
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
      .state('app.order-detail', {
        url: '/order-detail',
        params: {
          order: null,
          seller: false
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/order-detail.html',
            controller: 'OrderDetailController as vm'
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
      })
      .state('app.product', {
        url: '/product',
        params: {
          product: null
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/product.html',
            controller: 'ProductController as vm'
          }
        }
      })
      .state('app.mygarden-edit', {
        url: '/mygarden-edit',
        params: {
          garden: null
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/mygarden-edit.html',
            controller: 'MyGardenEditController as vm'
          }
        }
      })
      .state('app.mapaddress', {
        url: '/mapaddress',
        params: {
          garden: null,
          showAddressBar: true
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/mapaddress.html',
            controller: 'MapController as vm'
          }
        }
      })
      .state('app.profile', {
        url: '/profile',
        views: {
          'menuContent': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController as vm'
          }
        }
      });

    $urlRouterProvider.otherwise('/app/gardenlist');
  }

  angular.module('mgstore', ['ionic', 'restangular', 'ngCordovaOauth'])
    .config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider', config])
    .run(['$ionicPlatform', 'LoginService', run])
    .constant('baseUrl', baseUrl)
    .constant('apiUrl', apiUrl);

}());
