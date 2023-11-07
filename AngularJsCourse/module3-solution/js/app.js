(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
      this.getMatchedMenuItems = function(searchTerm) {
            return this.getMenuItems()
              .then(function (response) {
                  var foundItems = [];

                  Object.keys(response).forEach(function(key) {
                      var menuItems = response[key].menu_items;

                      menuItems.forEach((item) => {
                          if(item.description.includes(searchTerm)) {
                              foundItems.push({ shortName: item.short_name, name: item.name, description: item.description});
                          }
                      });

                  });

                  return foundItems;
              }, function(response) {
                  console.log('getMenuItems retrieval failed.');
        });
      };

      this.getMenuItems = function() {
          return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json').then(function(response) {
              return response.data;
          });
      };
    };

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
      var ctrl = this;
      ctrl.narrowIt = function(text) {
          if(text === undefined || text.length === 0) {
              ctrl.found = [];
              return;
          }
          MenuSearchService
            .getMatchedMenuItems(text)
            .then(function(items) {
                 if (items && items.length > 0) {
                     ctrl.found = items;
                 } else {
                     ctrl.found = [];
                 }
             });
      };

      ctrl.remove = function(index, items) {
          items.splice(index, 1);
      };
    };

    function FoundItems() {
        return {
            restrict: 'E',
            scope: {
                items: '<',
                onRemove: '&'
            },
            templateUrl: 'foundItems.html',
            controller: NarrowItDownController,
            controllerAs: 'ctrl',
            bindToController: true
        };
    };

})();