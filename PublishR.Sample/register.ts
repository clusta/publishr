module publishr.sample {
    "use strict";

    class RegisterController extends publishr.client.AuthController {
        registerSuccess() {
            window.location.href = '/signin';
        }
    }

    var states = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state('register', {
            url: '/register',
            controller: 'Register',
            templateUrl: 'Register.html'
        });
        $urlRouterProvider.otherwise("/register");
    };

    angular
        .module('register', ['ui.router'])
        .constant('api', SampleApi)
        .service('alert', SampleAlert)
        .controller('Register', RegisterController)
        .config(['$stateProvider', '$urlRouterProvider', states]);
} 