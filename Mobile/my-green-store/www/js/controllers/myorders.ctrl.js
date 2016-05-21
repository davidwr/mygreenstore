(function () {
  'use strict';
  function MyOrdersController($state) {
    var vm = this;

    vm.init = function () {
      
    };

    vm.init();
  }

  angular.module('mgstore')
    .controller('MyOrdersController', ['$state', MyOrdersController]);
} ());