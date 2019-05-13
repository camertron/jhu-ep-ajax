(function() {
"use strict";

angular.module('common', [])
.config(config)
.constant('ApiPath', 'https://cdutro-restaurant-server.herokuapp.com');

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
