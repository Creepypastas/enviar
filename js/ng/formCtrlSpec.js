describe('Controller: enviar.creepypastas.com.formCtrl', function () {

    // load the controller's module
    beforeEach(module('enviar.creepypastas.com'));

    var ctrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller('formCtrl', {
            $scope: scope
        });
    }));

    it('should be defined', function () {
        expect(ctrl).toBeDefined();
    });
});
