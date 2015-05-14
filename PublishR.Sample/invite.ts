module publishr.sample {
    "use strict";

    class InviteController extends publishr.client.InviteController {

    }

    var states = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state('invite', {
            url: '/invite',
            controller: 'Invite',
            templateUrl: 'Invite.html'
        });
        $urlRouterProvider.otherwise("/invite");
    };

    angular
        .module('invite', ['ui.router'])
        .constant('api', SampleApi)
        .service('alert', SampleAlert)
        .controller('Invite', InviteController)
        .config(['$stateProvider', '$urlRouterProvider', states]);
} 