(function() {
  "use strict";

  angular
    .module('restaurant')
    .service('UserService', UserService);

  function UserService() {
    var service = this;
  }
})();
