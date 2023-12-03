(function () {
  "use strict";

  angular.module('common')
  .service('MenuService', MenuService);


  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;
    service.user = null;

    service.saveUser = function(user) {
      console.log("saveUser:" + JSON.stringify(user));

      service.user = angular.copy(user);

      return true;
    }

    service.getUser = function() {
      return service.user;
    }

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };


    service.getMenuItems = function (category) {
      return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
        return response.data;
      });
    };

    service.getFavoriteDish = function(short_name, index) {
      // e.g. https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/C/menu_items/0.json
      return $http.get(ApiPath + '/menu_items/' + short_name + '/menu_items/' + index + '.json');
    }

  }
})();
