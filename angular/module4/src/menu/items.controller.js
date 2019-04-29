(function() {
  'use strict';

  angular
    .module('MenuApp')
    .controller('ItemsController', ItemsController);

  function ItemsController(category, items) {
    var controller = this;

    controller.category = category;
    controller.items = items;
  }
})();
