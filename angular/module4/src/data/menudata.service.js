(function() {
  'use strict';

  angular
    .module('Data')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];

  function MenuDataService($http) {
    var baseUrl = 'https://davids-restaurant.herokuapp.com/';
    var service = this;

    service.getAllCategories = function() {
      return httpGet('categories.json')
        .then(function(response) {
          return response.data;
        });
    };

    service.getCategory = function(categoryId) {
      return service.getAllCategories().then(function(categories) {
        for (var i = 0; i < categories.length; i ++) {
          if (categories[i].short_name === categoryId) {
            return categories[i];
          }
        }
      });
    };

    service.getItemsForCategory = function(categoryShortName) {
      return httpGet('menu_items.json', {category: categoryShortName})
        .then(function(response) {
          return response.data.menu_items;
        });
    };

    function httpGet(url, params) {
      return $http({
        method: 'GET',
        url: baseUrl + url + '?' + paramsToQueryString(params)
      });
    }

    function paramsToQueryString(params) {
      if (params == undefined) {
        params = {};
      }

      var result = [];

      for (var k in params) {
        result.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
      }

      return result.join('&');
    }
  }
})();
