module publishr.starter {
    "use strict";

    class RoomController {

    }

    var states = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state('room', {
            url: '/room',
            controller: 'Room',
            templateUrl: 'Room.html'
        });
        $urlRouterProvider.otherwise("/room");
    };

    angular
        .module('signin', ['ui.router'])
        .controller('Room', RoomController)
        .config(['$stateProvider', '$urlRouterProvider', states]);
} 