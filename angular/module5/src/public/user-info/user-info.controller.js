(function() {
  "use strict";

  angular
    .module('restaurant')
    .controller('UserInfoController', UserInfoController);

  UserInfoController.$inject = ['UserService'];

  function UserInfoController(UserService) {
    var controller = this;

    controller.user = UserService.user;
  }
})();
