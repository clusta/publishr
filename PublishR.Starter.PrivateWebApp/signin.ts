module publishr.starter {
    "use strict";

    class SigninController extends publishr.client.AuthController {
        authorizeSuccess(identity: publishr.client.Identity) {
            super.authorizeSuccess(identity);

            window.localStorage.setItem('bearerToken', identity.token);
            window.location.href = '/tasks';
        }
    }

    var states = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state('signin', {
            url: '/signin',
            controller: 'Signin',
            templateUrl: 'Signin.html'
        });
        $urlRouterProvider.otherwise("/signin");
    };

    angular
        .module('signin', ['ui.router'])
        .constant('api', StarterApi)
        .service('alert', StarterAlert)
        .controller('Signin', SigninController)
        .config(['$stateProvider', '$urlRouterProvider', states]);
} 