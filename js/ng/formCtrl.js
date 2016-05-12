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
    .controller('formCtrl', ['$scope', '$http', function ($scope, $http) {
        var formCtrl = this;
        formCtrl.post = {
            title: '',
            content: ''
        };
        formCtrl.currentUser = {
            username: 'invitado',
            p: 'invitado'
        };

        formCtrl.response = {};

        $scope.submitPost = function () {
            formCtrl.sendCommand("post-new");
        };

        formCtrl.sendCommand = function (command) {

            $http({
                url: 'https://creepypastas.com/comand',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: {user: formCtrl.currentUser, post: formCtrl.post, command: command}
            }).then(function success(res) {
                console.log("updatePost::response");
                console.log(res.data);
                formCtrl.response = res.data;
            }, function error(res) {
                console.error("updatePost::response");
                console.error(res.data);
                formCtrl.response = res.data;
            });
        };

    }]);
