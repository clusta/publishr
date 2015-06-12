module publishr.starter {
    "use strict";

    class SigninController extends publishr.client.AuthController {

    }

    var states = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state('signin', {
            url: '/signin?redirect',
            controller: 'Signin',
            templateUrl: 'Signin.html',
            params: {
                redirect: '/tasks'
            }
        });
        $urlRouterProvider.otherwise("/signin");
    };

    angular
        .module('signin', ['ui.router'])
        .controller('Signin', SigninController)
        .config(['$stateProvider', '$urlRouterProvider', states]);
} 