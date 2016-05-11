/**
 * @ngdoc controller
 * @name creepypastasApp:formCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
angular.module('creepypastasApp', [])
    .controller('formCtrl', function ($scope) {
        this.post = {
            title: '',
            content: ''
        };

    });
