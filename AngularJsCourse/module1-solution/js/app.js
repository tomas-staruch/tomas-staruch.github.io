(function() {
    'use strict';

    angular
        .module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.checkInput = function() {
            var input = $scope.input;
            if(typeof input === 'string' && input.length !== 0) {
                var inputLength = input
                                    .split(',')
                                    .filter(el => el != null && el.trim().length > 0)
                                    .length;

                if(inputLength >= 1 && inputLength <= 3) {
                    $scope.message = 'Enjoy!';
                    $scope.statusInput = 0;
                } else if(inputLength > 3) {
                    $scope.message = 'Too much!';
                    $scope.statusInput = 0;
                }
            } else {
                $scope.message = 'Please enter data first';
                $scope.statusInput = 1;
            }

        };
    }
}());