(function () {
    "use strict";

    angular.module('public')
        .controller('SignupController', ['MenuService', function (MenuService) {
            var $ctrl = this;
            $ctrl.saveSuccess = false;
            $ctrl.noDishNumberError = false;

            $ctrl.signup = function (user) {
                console.log("user:" + JSON.stringify(user));

                const [short_name, number] = user.favoriteDish.match(/\D+|\d+/g);

                if (short_name === undefined || number === undefined || number === '0') {
                    $ctrl.noDishNumberError = true;
                    $ctrl.saveSuccess = false;
                } else {
                    MenuService.getFavoriteDish(short_name, number - 1).then(function (response) {
                        user.favoriteDishDetails = response.data;

                        if (response.data == null) {
                            $ctrl.saveSuccess = false;
                            $ctrl.noDishNumberError = true;
                        } else {
                            user.favoriteDishUrl = {short_name: short_name, index: number - 1};
                            $ctrl.saveSuccess = MenuService.saveUser(user);
                            $ctrl.noDishNumberError = false;
                        }
                    }, function (error) {
                        console.log("error when getting favorite dish:" + error);
                        $ctrl.noDishNumberError = true;
                        $ctrl.saveSuccess = false;
                    });
                }
            }
        }]);
})();
