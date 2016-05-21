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

  	service.set = function(chave, valor) {
  		$window.localStorage[chave] = typeof valor === 'object' ? JSON.stringify(valor) : valor;
  	};

    service.get = function(chave) {
      var valor = $window.localStorage[chave];
      return tryParse(valor) || valor;
    };

  	service.remove = function(chave){
  		delete $window.localStorage[chave];
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
