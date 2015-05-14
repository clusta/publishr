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
        var InviteController = (function (_super) {
            __extends(InviteController, _super);
            function InviteController() {
                _super.apply(this, arguments);
            }
            return InviteController;
        })(publishr.client.InviteController);
        var states = function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('invite', {
                url: '/invite',
                controller: 'Invite',
                templateUrl: 'Invite.html'
            });
            $urlRouterProvider.otherwise("/invite");
        };
        angular.module('invite', ['ui.router']).constant('api', sample.SampleApi).service('alert', sample.SampleAlert).controller('Invite', InviteController).config(['$stateProvider', '$urlRouterProvider', states]);
    })(sample = publishr.sample || (publishr.sample = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=invite.js.map