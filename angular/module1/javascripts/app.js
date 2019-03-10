(function() {
  'use strict';

  angular
    .module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.message = '';
    $scope.messageColor = 'black';

    $scope.askIfTooMuch = function() {
      var lunchMenu = $scope.lunchMenu;

      if (!lunchMenu) {
        $scope.message = 'Please enter data first';
        $scope.messageColor = 'red';
        return;
      }

      var allItems = lunchMenu.split(',');
      var itemCount = 0;

      allItems.forEach(function(item) {
        if (item.trim().length > 0) {
          itemCount ++;
        }
      });

      if (itemCount === 0) {
        // happens when the input is just a list of commas
        $scope.messageColor = '#DFD21F';
        $scope.message = "Hmm, I'm not sure you get how this works.";
      } else {
        // happens when the user has entered at least one legit item
        $scope.messageColor = 'green';

        if (itemCount > 3) {
          $scope.message = 'Too much!';
        } else {
          $scope.message = 'Enjoy!';
        }
      }
    }
  }
})();
