var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var publishr;
(function (publishr) {
    var sample;
    (function (sample) {
        "use strict";
        var StartController = (function (_super) {
            __extends(StartController, _super);
            function StartController() {
                _super.apply(this, arguments);
            }
            StartController.prototype.authorizeSuccess = function (identity) {
                _super.prototype.authorizeSuccess.call(this, identity);
                window.localStorage.setItem('bearerToken', identity.access_token);
            };
            return StartController;
        })(publishr.client.AuthController);
        var SuccessController = (function () {
            function SuccessController() {
            }
            return SuccessController;
        })();
        var states = function ($stateProvider, $urlRouterProvider) {
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
        };
        angular.module('signin', ['ui.router']).constant('api', sample.SampleApi).service('alert', sample.SampleAlert).controller('Start', StartController).controller('Success', SuccessController).config(['$stateProvider', '$urlRouterProvider', states]);
    })(sample = publishr.sample || (publishr.sample = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=signin.js.map