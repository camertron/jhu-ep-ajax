(function() {
  'use strict';

  angular
    .module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .filter('pluralize', PluralizeFilter)
    .filter('inAngularDollars', AngularDollarsFilter)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
    var controller = this;

    controller.purchasableItems = ShoppingListCheckOffService.getPurchasableItems();

    controller.purchaseItem = function(index) {
      ShoppingListCheckOffService.purchaseItem(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var controller = this;

    controller.purchasedItems = ShoppingListCheckOffService.getPurchasedItems();
  }

  function PurchasableItem(options) {
    var item = this;

    item.name = options.name;
    item.quantity = options.quantity;
    item.units = options.units;
    item.pricePerItem = options.pricePerItem;

    item.calcTotalPrice = function() {
      return item.quantity * item.pricePerItem;
    }
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var purchasedItems = [];
    var purchasableItems = [
      new PurchasableItem({
        name: 'cookies',
        quantity: 10,
        units: ['bag', 'bags'],
        pricePerItem: 5.99
      }),
      new PurchasableItem({
        name: 'peanut butter',
        quantity: 2,
        units: ['jar', 'jars'],
        pricePerItem: 7.99
      }),
      new PurchasableItem({
        name: 'nutella',
        quantity: 1,
        units: ['jar', 'jars'],
        pricePerItem: 4.50
      }),
      new PurchasableItem({
        name: 'ground turkey',
        quantity: 3,
        units: ['pack', 'packs'],
        pricePerItem: 10.00
      }),
      new PurchasableItem({
        name: 'corn',
        quantity: 5,
        units: ['ear', 'ears'],
        pricePerItem: 0.35
      }),
      new PurchasableItem({
        name: 'salt',
        quantity: 1,
        units: ['shaker', 'shakers'],
        pricePerItem: 1.49
      })
    ];

    service.getPurchasableItems = function() {
      return purchasableItems;
    };

    service.getPurchasedItems = function() {
      return purchasedItems;
    };

    service.purchaseItem = function(index) {
      purchasedItems.push(purchasableItems[index]);
      purchasableItems.splice(index, 1);
    };
  }

  function PluralizeFilter() {
    return function(number, cases) {
      if (number == 1) {
        return cases[0]
      } else {
        return cases[1]
      }
    }
  }

  function AngularDollarsFilter() {
    return function(input) {
      return "$$$" + input;
    }
  }
})();
