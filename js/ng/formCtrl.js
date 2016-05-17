/**
 * @ngdoc controller
 * @name creepypastasApp:formCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
angular.module('creepypastasApp', ['ngAnimate', 'toastr', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
    .controller('formCtrl', ['$scope', '$http', 'toastr', '$mdConstant', function ($scope, $http, toastr,$mdConstant) {
        var formCtrl = this;
        formCtrl.post = {
            title: '',
            content: '',
            category: [],
            categoriesObj: [{name:'categorías',term_id:1}],
            tags: '',
            tagsList:['etiquetas']
        };
        formCtrl.currentUser = {
            username: '',
            p: ''
        };

        formCtrl.response = {
            error: undefined,
            errors: {}
        };

        formCtrl.availableCategories = [{term_id:14,name:"Canciones"},{term_id:12,name:"Caricaturas"},{term_id:464,name:"Cementerio"}];


        this.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

        formCtrl.filterCategories = function (query) {
            console.log("filtering cats", formCtrl.availableCategories);
            return formCtrl.availableCategories;
        };

        formCtrl.catAdded = function(cat) {
            formCtrl.post.category = [];
            for (var i = formCtrl.post.categoriesObj.length - 1; i >= 0; i--) {
                if(formCtrl.post.categoriesObj[i].term_id !== 1)
                    formCtrl.post.category.push(formCtrl.post.categoriesObj[i].term_id);
                else {
                    formCtrl.post.categoriesObj.splice(i, 1);
                }
            }
        };

        formCtrl.tagAdded = function(tag) {
            formCtrl.post.tags = formCtrl.post.tagsList.join();
            for (var i = formCtrl.post.tagsList.length - 1; i > 0; i--) {
                if(formCtrl.post.tagsList[i] === "etiquetas")
                    formCtrl.post.tagsList.splice(i, 1);
            }
            formCtrl.post.tags = formCtrl.post.tagsList.join();
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

            if (true === data.success && typeof data.post_id == 'number') {
                console.log("app::toastrAll::toasting success");
                toastr.success('Id de tu envío: ' + data.post_id, '¡Aporte guardado!');
            }

            if (typeof data.error == 'undefined' && typeof data.success == 'undefined') {
                console.log("app::toastrAll::toasting ups");
                toastr.info('¡Ups!', 'Algo extraño sucede, por favor envíanos un email');
            }

        }

    }]).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();
});
