module publishr.starter {
    "use strict";

    var cachedPage: publishr.client.Resource<publishr.client.Page>;

    class CachedPageController extends publishr.client.PageController {

        getPage() {
            if (cachedPage) {
                this.getPageSuccess(cachedPage);
            }
            else {
                super.getPage();
            }
        }

        getPageSuccess(page: publishr.client.Resource<publishr.client.Page>) {
            cachedPage = page;

            super.getPageSuccess(page);
        }

        initialize() {
            this.state.id = this.state['path'];
            this.scope['state'] = this.state;
            this.getPage();
        }

    }

    class RoomController extends CachedPageController {
   
    }

    class SearchController extends publishr.client.SearchController {
        constructor(
            public scope: publishr.client.SearchScope,
            public state: publishr.client.SearchState,
            public window: ng.IWindowService,
            public location: ng.ILocationService,
            public http: ng.IHttpService,
            public q: ng.IQService,
            public response: Response
            ) {
            super(scope, state, window, location, http, q);
        }
        initialize() {
            var that = this;
            this.search();
            this.scope.$watch('result', function (newValue, oldValue) {
                that.response.setResponse(newValue);
            });
        }
        static $inject = ["$scope", "$stateParams", "$window", "$location", "$http", "$q", "Response"];
    }

    class CreateController extends CachedPageController {
        //initialize() {
        //    super.initialize();
        //}
        createPage(form?: ng.IFormController) {
            if (this.scope.create) {
                this.scope.create.kind = this.state.kind;
                this.scope.create.path = this.state["path"];
                this.scope.create.data.tags = [].concat(this.state["tag"]);
            }
            super.createPage(form);
        }
        createPageSuccess(resource: publishr.client.Resource<publishr.client.Page>) {
            this.window.location.reload();
        }
    }

    var states = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
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

    interface Response {
        getResponse(): publishr.client.Token;
        setResponse(response): publishr.client.Token;
        data: publishr.client.Token;
    }

    angular
        .module("room", ["ui.router"])
        .controller("Create", CreateController)
        .controller("Room", RoomController)
        .controller("Search", SearchController)
        .factory("Response", function () {
            var results : any = [];
            results.data = null;
            results.setResponse = function(response) {
                results.data = response;
                return results.data;
            }
            results.getResponse = function () {
                return results.data;
            }
            return results;
        })
        .config(["$stateProvider", "$urlRouterProvider", states]);
} 