(function() {
  'use strict';

  angular
    .module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/menu/templates/home.template.html'
      })
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/menu/templates/categories.template.html',
        controller: 'CategoriesController as categoriesCtrl',
        resolve: {
          categories: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state('items', {
        url: '/categories/{categoryId}/items',
        templateUrl: 'src/menu/templates/items.template.html',
        controller: 'ItemsController as itemsCtrl',
        resolve: {
          category: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
            return MenuDataService.getCategory($stateParams.categoryId);
          }],
          items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
            return MenuDataService.getItemsForCategory($stateParams.categoryId);
          }]
        }
      });

    $urlRouterProvider.otherwise('/');
  }
})();
