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
        var SearchController = (function (_super) {
            __extends(SearchController, _super);
            function SearchController() {
                _super.apply(this, arguments);
            }
            SearchController.prototype.initialize = function () {
                this.search();
            };
            return SearchController;
        })(publishr.client.SearchController);
        var PageController = (function (_super) {
            __extends(PageController, _super);
            function PageController() {
                _super.apply(this, arguments);
            }
            PageController.prototype.createPage = function (form) {
                this.scope.create.data.cards['medium'].title = this.scope.create.data.regions['main'].sections[0].blocks['header'].text;
                _super.prototype.createPage.call(this, form);
            };
            return PageController;
        })(publishr.client.PageController);
        var states = function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('search', {
                url: '/search?tag&state',
                controller: 'Search',
                templateUrl: 'Search.html',
                params: {
                    kind: 'blog_post'
                }
            });
            $stateProvider.state('create', {
                url: '/create',
                controller: 'Page',
                templateUrl: 'Create.html',
                params: {
                    kind: 'blog_post',
                    redirect: '/search'
                }
            });
            $stateProvider.state('read', {
                url: '/read/:id',
                controller: 'Page',
                templateUrl: 'Read.html'
            });
            $stateProvider.state('update', {
                url: '/update/:id',
                controller: 'Page',
                templateUrl: 'Update.html',
                params: {
                    redirect: '/search'
                }
            });
            $urlRouterProvider.otherwise("/search");
        };
        angular.module('blogpost', ['ui.router']).controller('Search', SearchController).controller('Page', PageController).config(['$stateProvider', '$urlRouterProvider', states]);
    })(starter = publishr.starter || (publishr.starter = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=blogpost.js.map