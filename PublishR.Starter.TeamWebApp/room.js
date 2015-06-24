var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var publishr;
(function (publishr) {
    var starter;
    (function (starter) {
        "use strict";
        var cachedPage;
        var CachedPageController = (function (_super) {
            __extends(CachedPageController, _super);
            function CachedPageController() {
                _super.apply(this, arguments);
            }
            CachedPageController.prototype.getPage = function () {
                if (cachedPage) {
                    this.getPageSuccess(cachedPage);
                }
                else {
                    _super.prototype.getPage.call(this);
                }
            };
            CachedPageController.prototype.getPageSuccess = function (page) {
                cachedPage = page;
                _super.prototype.getPageSuccess.call(this, page);
            };
            CachedPageController.prototype.initialize = function () {
                this.state.id = this.state['path'];
                this.scope['state'] = this.state;
                this.getPage();
            };
            return CachedPageController;
        })(publishr.client.PageController);
        var RoomController = (function (_super) {
            __extends(RoomController, _super);
            function RoomController() {
                _super.apply(this, arguments);
            }
            return RoomController;
        })(CachedPageController);
        var SearchController = (function (_super) {
            __extends(SearchController, _super);
            function SearchController(scope, state, window, location, http, q, response) {
                _super.call(this, scope, state, window, location, http, q);
                this.scope = scope;
                this.state = state;
                this.window = window;
                this.location = location;
                this.http = http;
                this.q = q;
                this.response = response;
            }
            SearchController.prototype.initialize = function () {
                var that = this;
                this.search();
                this.scope.$watch('result', function (newValue, oldValue) {
                    that.response.setResponse(newValue);
                });
            };
            SearchController.$inject = ["$scope", "$stateParams", "$window", "$location", "$http", "$q", "Response"];
            return SearchController;
        })(publishr.client.SearchController);
        var CreateController = (function (_super) {
            __extends(CreateController, _super);
            function CreateController() {
                _super.apply(this, arguments);
            }
            //initialize() {
            //    super.initialize();
            //}
            CreateController.prototype.createPage = function (form) {
                if (this.scope.create) {
                    this.scope.create.kind = this.state.kind;
                    this.scope.create.path = this.state["path"];
                    this.scope.create.data.tags = [].concat(this.state["tag"]);
                }
                _super.prototype.createPage.call(this, form);
            };
            CreateController.prototype.createPageSuccess = function (resource) {
                this.window.location.reload();
            };
            return CreateController;
        })(CachedPageController);
        var states = function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('room', {
                url: '/room/:path?kind&tag',
                views: {
                    "room": {
                        templateUrl: "Room.html",
                        controller: "Room"
                    },
                    "search": {
                        templateUrl: "Search.html",
                        controller: "Search"
                    },
                    "create": {
                        templateUrl: "Create.html",
                        controller: "Create"
                    }
                },
                params: {
                    path: 'default',
                    kind: 'room',
                    state: 'draft'
                }
            });
            $urlRouterProvider.otherwise("/room/");
        };
        angular.module("room", ["ui.router"]).controller("Create", CreateController).controller("Room", RoomController).controller("Search", SearchController).factory("Response", function () {
            var results = [];
            results.data = null;
            results.setResponse = function (response) {
                results.data = response;
                return results.data;
            };
            results.getResponse = function () {
                return results.data;
            };
            return results;
        }).config(["$stateProvider", "$urlRouterProvider", states]);
    })(starter = publishr.starter || (publishr.starter = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=room.js.map