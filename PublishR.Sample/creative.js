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
        var CreativeController = (function (_super) {
            __extends(CreativeController, _super);
            function CreativeController() {
                _super.apply(this, arguments);
            }
            CreativeController.prototype.buildCreative = function (fileSet) {
                return {
                    title: this.scope.create.title,
                    blocks: {
                        content: {
                            media: [
                                {
                                    format: null,
                                    caption: null,
                                    credit: null,
                                    sources: [
                                        {
                                            uri: fileSet.original.uri,
                                            type: fileSet.original.type,
                                            dimensions: {
                                                height: 200,
                                                width: 200
                                            },
                                            properties: {}
                                        },
                                        {
                                            uri: fileSet.thumbnail.uri,
                                            type: fileSet.thumbnail.type,
                                            dimensions: {
                                                height: 60,
                                                width: 60
                                            },
                                            properties: {}
                                        }
                                    ],
                                    properties: {}
                                }
                            ]
                        }
                    },
                    properties: {}
                };
            };
            return CreativeController;
        })(publishr.client.CreativeController);
        var states = function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('creative', {
                url: '/creative',
                controller: 'Creative',
                templateUrl: 'Creative.html',
                params: {
                    setname: 'photos',
                    kind: 'photo',
                    path: '/',
                }
            });
            $urlRouterProvider.otherwise("/creative");
        };
        angular.module('creative', ['ui.router']).constant('api', sample.SampleApi).service('alert', sample.SampleAlert).controller('Creative', CreativeController).config(['$stateProvider', '$urlRouterProvider', states]);
    })(sample = publishr.sample || (publishr.sample = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=creative.js.map