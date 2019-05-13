(function() {
  "use strict";

  angular
    .module('restaurant')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['UserService', 'MenuService'];

  function SignUpController(UserService, MenuService) {
    var controller = this;
    controller.user = {};
    controller.favoriteValid = true;

    controller.submit = function() {
      controller.doesMenuCategoryExist().then(function(exists) {
        if (exists) {
          UserService.user = controller.user;
          controller.favoriteValid = true;
        } else {
          controller.favoriteValid = false;
        }
      });
    }

    controller.doesMenuCategoryExist = function() {
      return MenuService
        .getMenuItems(controller.user.favorite)
        .then(function(data) {
          if (data.menu_items.length > 0) {
            return true;
          } else {
            return false;
          }
        });
    }
  }
})();
