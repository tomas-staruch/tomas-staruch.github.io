(function() {
    'use strict';

    var app = angular.module('NarrowItDownApp', []);

    app.service('MenuSearchService', function($http, $q) {
      this.getMatchedMenuItems = function(searchTerm, found) {
        this.getMenuItems()
              .then(function (response) {
                  // console.log('items:' + JSON.stringify(response));

                  Object.keys(response).forEach(function(key) {
                      var menuItems = response[key].menu_items;

                      menuItems.forEach((item) => {
                          if(item.description.includes(searchTerm)) {
                              found.push({ shortName: item.short_name, name: item.name, description: item.description});
                          }
                      });
                  });
              }, function(response) {
                  console.log('getMenuItems retrieval failed.');
        });
      };

      this.getMenuItems = function() {
          return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json').then(function(response) {
              return response.data;
          });
      };
    });

    app.controller('NarrowItDownController', function($scope, MenuSearchService) {
      var ctrl = this;

      ctrl.narrowIt = function(text) {
          ctrl.found = [];

          if(text === undefined || text.length === 0) {
              console.log("text is empty");
              return;
          }

          MenuSearchService.getMatchedMenuItems(text, ctrl.found);
      };

      ctrl.remove = function(index) {
          console.log("remove item on:" + index);
          ctrl.found.splice(index, 1);
      };
    });

    // see
    // https://github.com/igogra/Single-Page-Web-Applications-with-AngularJS/blob/master/Module3/js/app.js
    // https://stackoverflow.com/questions/17454782/angularjs-uncaught-referenceerror-controller-is-not-defined-from-module
    app.directive('foundItems', function() {
        return {
            scope: {
                items: '<',
                onRemove: '&'
            },
            templateUrl: 'foundItems.html',
            controller: 'NarrowItDownController',
            controllerAs: 'ctrl',
            bindToController: true
        };
    });

})();