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
        var RegisterController = (function (_super) {
            __extends(RegisterController, _super);
            function RegisterController() {
                _super.apply(this, arguments);
            }
            RegisterController.prototype.registerSuccess = function () {
                window.location.href = '/signin';
            };
            return RegisterController;
        })(publishr.client.RegisterController);
        var states = function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('register', {
                url: '/register?token&email',
                controller: 'Register',
                templateUrl: 'Register.html'
            });
            $urlRouterProvider.otherwise("/register");
        };
        angular.module('register', ['ui.router']).constant('api', sample.SampleApi).service('alert', sample.SampleAlert).controller('Register', RegisterController).config(['$stateProvider', '$urlRouterProvider', states]);
    })(sample = publishr.sample || (publishr.sample = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=register.js.map