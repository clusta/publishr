module publishr.sample {
    "use strict";

    class StartController extends publishr.client.AuthController {
        authorizeSuccess(identity: publishr.client.Identity) {
            super.authorizeSuccess(identity);

            window.localStorage.setItem('bearerToken', identity.access_token);
        }
    }

    class SuccessController {

    }

    angular
        .module('signin', ['ui.router'])
        .constant('api', SampleApi)
        .service('alert', SampleAlert)
        .controller('Start', StartController)
        .controller('Success', SuccessController)
        .config(['$stateProvider', '$urlRouterProvider', ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
            $stateProvider.state('start', {
                url: '/start',
                controller: 'Start',
                templateUrl: 'Start.html',
                params: {
                    redirect: '/success'
                }
            });
            $stateProvider.state('success', {
                url: '/success',
                controller: 'Success',
                templateUrl: 'Success.html'
            });
            $urlRouterProvider.otherwise("/start");
    }]);
} 