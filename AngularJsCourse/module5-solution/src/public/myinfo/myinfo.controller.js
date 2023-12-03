(function () {
    "use strict";

    angular.module('public')
        .controller('MyInfoController', ['MenuService', 'ApiPath', function(MenuService, ApiPath) {
            var $ctrl = this;
            $ctrl.user = null;
            $ctrl.apiPath = ApiPath;

            const user = MenuService.getUser();

            if(user == null) {
                $ctrl.isUserSignedUp = false;
            } else {
                $ctrl.isUserSignedUp = true;
                $ctrl.user = user;
                console.log(JSON.stringify(user))
            }
    }]);


})();
