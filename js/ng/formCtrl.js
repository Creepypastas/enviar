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

    }]).config(['$mdThemingProvider', onConfig]);


    function definePalettes($mdThemingProvider) {
  $mdThemingProvider.definePalette('darkBluePalette', {
    '50':   '#5dcef8',
    '100':  '#13b8f5',
    '200':  '#0894c8',
    '300':  '#056184',
    '400':  '#044c66',
    '500':  '#02202c',
    '600':  '#0C1A34',
    '700':  '#010b0e',
    '800':  '#000000',
    '900':  '#000000',
    'A100': '#5dcef8',
    'A200': '#13b8f5',
    'A400': '#044c66',
    'A700': '#010b0e',
    'contrastDefaultColor': 'light',
    'contrastDarkColors':   '50 100 A100 A200'
  });

  $mdThemingProvider.definePalette('darkOrangePalette', {
    '50':   '#fffcf7',
    '100':  '#ffdcab',
    '200':  '#ffc573',
    '300':  '#ffa72b',
    '400':  '#ff9b0d',
    '500':  '#ed8b00',
    '600':  '#ce7900',
    '700':  '#b06700',
    '800':  '#915500',
    '900':  '#734300',
    'A100': '#fffcf7',
    'A200': '#ffdcab',
    'A400': '#ff9b0d',
    'A700': '#b06700',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 500 600 A100 A200 A400'
  });

  $mdThemingProvider.definePalette('pinkPalette', {
    '50':   '#ffffff',
    '100':  '#f7bfbc',
    '200':  '#f28f8a',
    '300':  '#eb514a',
    '400':  '#e7372e',
    '500':  '#de2219',
    '600':  '#c21e16',
    '700':  '#a71a13',
    '800':  '#8b1510',
    '900':  '#70110d',
    'A100': '#ffffff',
    'A200': '#f7bfbc',
    'A400': '#e7372e',
    'A700': '#a71a13',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 A100 A200'
  });

  $mdThemingProvider.definePalette('greyBluePalette', {
    '50':   '#ffffff',
    '100':  '#cfe7f8',
    '200':  '#9fd0f0',
    '300':  '#61b1e6',
    '400':  '#46a4e2',
    '500':  '#2c97de',
    '600':  '#2087cc',
    '700':  '#1c75b1',
    '800':  '#186497',
    '900':  '#13527c',
    'A100': '#ffffff',
    'A200': '#cfe7f8',
    'A400': '#46a4e2',
    'A700': '#1c75b1',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
  });

  $mdThemingProvider.definePalette('greyPalette', {
    '50':   '#9fa5a8',
    '100':  '#777f83',
    '200':  '#5c6266',
    '300':  '#3a3e40',
    '400':  '#2c2f30',
    '500':  '#1d1f20',
    '600':  '#0e0f10',
    '700':  '#000000',
    '800':  '#000000',
    '900':  '#000000',
    'A100': '#9fa5a8',
    'A200': '#777f83',
    'A400': '#2c2f30',
    'A700': '#000000',
    'contrastDefaultColor': 'light',
    'contrastDarkColors':   '50 A100'
  });
}

function onConfig($mdThemingProvider) {
  definePalettes($mdThemingProvider);

  const customForegroundPalette = {
        name: 'light',
        1:    'rgba(236, 240, 241,  1)',
        2:    'rgba(236, 240, 241, .7)',
        3:    'rgba(236, 240, 241, .5)',
        4:    'rgba(236, 240, 241, .15)'
    };

  $mdThemingProvider.theme('custom-dark-blue').primaryPalette('darkBluePalette', {
    default: '600'
  });

  // Define the theme
  $mdThemingProvider.theme('docs-dark')
      .primaryPalette('darkOrangePalette', {
          default: '500'
      })
      .accentPalette('greyBluePalette', {
          default: '400'
      })
      .warnPalette('pinkPalette', {
          default: '300'
      })
      .backgroundPalette('greyPalette', {
          default: '400',
      }).foregroundPalette = customForegroundPalette;
}
