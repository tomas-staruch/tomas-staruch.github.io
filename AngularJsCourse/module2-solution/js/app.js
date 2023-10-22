(function() {
    'use strict';

    var app = angular.module('ShoppingListCheckOff', []);

    app.service('ShoppingListCheckOffService', function() {
      this.toBuyItems = [
         {name:'cookies', quantity:10},
         {name:'milk', quantity:1},
         {name:'chocolates', quantity:3},
         {name:'juices', quantity:2},
         {name:'bread', quantity:1}
      ];

      this.boughtItems = [];

      this.buyItem = function(index, from, to) {
        console.log("buy item:" + index + " from:" + from + " to:" + to);

        to.push(from[index]);
        from.splice(index, 1);
      };
    });

    app.controller('ToBuyController', function($scope, ShoppingListCheckOffService) {
      var ctrl = this;

      ctrl.items = ShoppingListCheckOffService.toBuyItems;
      ctrl.buyItem = function(index) {
        ShoppingListCheckOffService.buyItem(index, ShoppingListCheckOffService.toBuyItems, ShoppingListCheckOffService.boughtItems);
      };
    });

    app.controller('AlreadyBoughtController', function($scope, ShoppingListCheckOffService) {
      var ctrl = this;

      ctrl.items = ShoppingListCheckOffService.boughtItems;
    });

})();
