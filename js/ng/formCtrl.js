/**
 * @ngdoc controller
 * @name creepypastasApp:formCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
angular.module('creepypastasApp', ['ngAnimate', 'toastr', 'ngTagsInput'])
    .controller('formCtrl', ['$scope', '$http', 'toastr', function ($scope, $http, toastr) {
        var formCtrl = this;
        formCtrl.post = {
            title: '',
            content: '',
            category: [],
            categoriesObj : []
        };
        formCtrl.currentUser = {
            username: '',
            p: ''
        };

        formCtrl.response = {
            error: undefined,
            errors: {}
        };

        $scope.loadSuperheroes = function(query) {
          return $http.get('https://json.creepypastas.com/creepypastas.com/terms/categories.json');
        };

        $scope.catAdded = function(tag) {
          formCtrl.post.category = [];
          for (var i = 0; i < formCtrl.post.categoriesObj.length; i++) {
            formCtrl.post.category.push(formCtrl.post.categoriesObj[i].term_id);
          }
        };

        $scope.catRemoved = function(tag) {
          formCtrl.post.category = [];
          for (var i = 0; i < formCtrl.post.categoriesObj.length; i++) {
            formCtrl.post.category.push(formCtrl.post.categoriesObj[i].term_id);
          }
        };

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
                formCtrl.toastrAll(res.data);
            }, function error(res) {
                console.error("updatePost::response");
                console.error(res.data);
                formCtrl.response = res.data;
            });
        };

        formCtrl.toastrAll = function (data) {
            console.log("app::toastrAll::init");

            if (true === data.error && typeof data.errors === 'object') {
                console.log("app::toastrAll::toasting errors");
                for (var error in data.errors) {
                    if (data.errors.hasOwnProperty(error) && typeof error == 'string') {
                        toastr.error(data.errors[error], error);
                    }
                }
            }

            if (true === data.success && typeof data.post_id == 'number'){
                console.log("app::toastrAll::toasting success");
                toastr.success('Id de tu envío: ' + data.post_id, '¡Aporte guardado!');
            }

            if(typeof data.error == 'undefined' && typeof data.success == 'undefined') {
                console.log("app::toastrAll::toasting ups");
                toastr.info('¡Ups!', 'Algo extraño sucede, por favor envíanos un email');
            }

        }

    }]);
