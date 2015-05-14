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
        var SigninController = (function (_super) {
            __extends(SigninController, _super);
            function SigninController() {
                _super.apply(this, arguments);
            }
            SigninController.prototype.authorizeSuccess = function (identity) {
                _super.prototype.authorizeSuccess.call(this, identity);
                window.localStorage.setItem('bearerToken', identity.accesstoken);
                window.location.href = '/tasks';
            };
            return SigninController;
        })(publishr.client.AuthController);
        var states = function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('signin', {
                url: '/signin',
                controller: 'Signin',
                templateUrl: 'Signin.html'
            });
            $urlRouterProvider.otherwise("/signin");
        };
        angular.module('signin', ['ui.router']).constant('api', sample.SampleApi).service('alert', sample.SampleAlert).controller('Signin', SigninController).config(['$stateProvider', '$urlRouterProvider', states]);
    })(sample = publishr.sample || (publishr.sample = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=signin.js.map