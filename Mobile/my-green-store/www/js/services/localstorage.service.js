(function () {
  'use strict';

  function LocalStorageService($window) {
    var service = {};

  	function tryParse(str) {
  		try {
  			return JSON.parse(str);
  		} catch (e) {
  			return null;
  		}
  	}

  	service.set = function(key, value) {
  		$window.localStorage[key] = typeof value === 'object' ? JSON.stringify(value) : value;
  	};

    service.get = function(key) {
      var value = $window.localStorage[key];
      return tryParse(value) || value;
    };

  	service.remove = function(key){
  		delete $window.localStorage[key];
  	};

  	service.isLoggedIn = function() {
      var user = service.get('user');
  		return user && user.token;
  	};

  	return service;
  }

  angular.module('mgstore')
    .factory('LocalStorageService', ['$window', LocalStorageService]);

} ());
