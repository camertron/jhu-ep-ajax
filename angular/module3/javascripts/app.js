(function() {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)

  NarrowItDownController.$inject = ['MenuSearchService']

  function NarrowItDownController(MenuSearchService) {
    var controller = this;

    // list of found items; null indicates no searches have been attempted
    controller.found = null;

    // the user-supplied terms to search the menu for
    controller.searchTerm = '';

    // string displayed if an error occurred querying the menu server
    controller.httpError = false;

    controller.narrowItDown = function() {
      controller.httpError = false;

      if (controller.searchTerm.length === 0) {
        controller.found = [];
        return;
      }

      MenuSearchService
        .getMatchedMenuItems(controller.searchTerm)
        .then(function(foundItems) {
          controller.found = foundItems;
        }, function(_errorResponse) {
          controller.found = null;
          controller.httpError = true;
        });
    }

    controller.removeItem = function(index) {
      controller.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http'];

  function MenuSearchService($http) {
    var baseUrl = 'https://davids-restaurant.herokuapp.com/';
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      var requestOptions = {
        method: 'GET',
        url: baseUrl + 'menu_items.json'
      }

      return $http(requestOptions).then(function(response) {
        var foundItems = [];
        var searchTermLower = searchTerm.toLowerCase();

        for (var i = 0; i < response.data.menu_items.length; i ++) {
          var menuItem = response.data.menu_items[i];

          if (menuItem.name.toLowerCase().indexOf(searchTerm) > -1) {
            foundItems.push(menuItem);
          }
        }

        return foundItems;
      });
    }
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'components/foundItems.html',
      scope: {
        list: '=',
        onRemove: '&'
      }
    };

    return ddo;
  }
})();
