var publishr;
(function (publishr) {
    var starter;
    (function (starter) {
        "use strict";
        var RoomController = (function () {
            function RoomController() {
            }
            return RoomController;
        })();
        var states = function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('room', {
                url: '/room',
                controller: 'Room',
                templateUrl: 'Room.html'
            });
            $urlRouterProvider.otherwise("/room");
        };
        angular.module('room', ['ui.router']).controller('Room', RoomController).config(['$stateProvider', '$urlRouterProvider', states]);
    })(starter = publishr.starter || (publishr.starter = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=room.js.map