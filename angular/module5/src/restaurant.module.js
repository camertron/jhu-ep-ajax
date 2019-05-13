(function() {
  "use strict";

  /**
   * Restaurant module that includes the public module as a dependency
   */
  angular.module('restaurant', ['public'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/public/home/home.html'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'src/public/signup/signup.html',
        controller: 'SignUpController as signUpCtrl'
      })
      .state('info', {
        url: '/info',
        templateUrl: 'src/public/user-info/user-info.html',
        controller: 'UserInfoController as userInfoCtrl'
      });

    // If user goes to a path that doesn't exist, redirect to public root
    $urlRouterProvider.otherwise('/');
  }
})();
