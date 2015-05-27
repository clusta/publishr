var publishr;
(function (publishr) {
    var sample;
    (function (sample) {
        "use strict";
        var WallController = (function () {
            function WallController(scope, http, api) {
                this.scope = scope;
                this.http = http;
                this.api = api;
                this.loadWall();
            }
            WallController.prototype.getWallUri = function () {
                return publishr.client.UriHelpers.join(this.api.baseAddress, 'wall');
            };
            WallController.prototype.loadWall = function () {
                var _this = this;
                this.http.get(this.getWallUri()).success(function (r) { return _this.loadWallSuccess(r); });
            };
            WallController.prototype.loadWallSuccess = function (wall) {
                this.scope.wall = wall;
            };
            WallController.$inject = ["$scope", "$http", "api"];
            return WallController;
        })();
        var routes = function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('wall', {
                url: '/wall',
                controller: 'Wall',
                templateUrl: 'Wall.html'
            });
            $urlRouterProvider.otherwise("/wall");
        };
        angular.module('wall', ['ui.router']).constant('api', sample.SampleApi).service('alert', sample.SampleAlert).controller('Wall', WallController).config(['$stateProvider', '$urlRouterProvider', routes]);
    })(sample = publishr.sample || (publishr.sample = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=wall.js.map