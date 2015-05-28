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
        var ListController = (function (_super) {
            __extends(ListController, _super);
            function ListController() {
                _super.apply(this, arguments);
            }
            ListController.prototype.initialize = function () {
                this.state.kind = 'blog_post';
                this.state.state = 'draft';
                this.search();
            };
            return ListController;
        })(publishr.client.SearchController);
        var CreateController = (function (_super) {
            __extends(CreateController, _super);
            function CreateController() {
                _super.apply(this, arguments);
            }
            CreateController.prototype.initialize = function () {
                this.scope.create = this.buildCreatePageScope('blog_post');
            };
            CreateController.prototype.createPageSuccess = function (resource) {
                this.location.url('/list');
            };
            return CreateController;
        })(publishr.client.PageController);
        var DetailsController = (function (_super) {
            __extends(DetailsController, _super);
            function DetailsController() {
                _super.apply(this, arguments);
            }
            DetailsController.prototype.initialize = function () {
                this.getPage();
            };
            return DetailsController;
        })(publishr.client.PageController);
        var CommentController = (function (_super) {
            __extends(CommentController, _super);
            function CommentController() {
                _super.apply(this, arguments);
            }
            CommentController.prototype.initialize = function () {
                this.state.path = this.state["id"];
                this.list();
                _super.prototype.initialize.call(this);
            };
            return CommentController;
        })(publishr.client.CommentController);
        var EditController = (function (_super) {
            __extends(EditController, _super);
            function EditController() {
                _super.apply(this, arguments);
            }
            EditController.prototype.initialize = function () {
                this.getPage();
            };
            EditController.prototype.updateCardsSuccess = function () {
                this.location.url('/list');
            };
            return EditController;
        })(publishr.client.PageController);
        var states = function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('list', {
                url: '/list?tag',
                controller: 'List',
                templateUrl: 'List.html'
            });
            $stateProvider.state('create', {
                url: '/create',
                controller: 'Create',
                templateUrl: 'Create.html'
            });
            $stateProvider.state('details', {
                url: '/details/:id',
                views: {
                    "": {
                        controller: 'Details',
                        templateUrl: 'Details.html'
                    },
                    "comment": {
                        controller: 'Comment',
                        templateUrl: 'Comment.html'
                    }
                }
            });
            $stateProvider.state('edit', {
                url: '/edit/:id',
                controller: 'Edit',
                templateUrl: 'Edit.html'
            });
            $urlRouterProvider.otherwise("/list");
        };
        angular.module('blogpost', ['ui.router']).constant('api', starter.StarterApi).service('alert', starter.StarterAlert).controller('List', ListController).controller('Create', CreateController).controller('Details', DetailsController).controller('Comment', CommentController).controller('Edit', EditController).config(['$stateProvider', '$urlRouterProvider', states]);
    })(starter = publishr.starter || (publishr.starter = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=blogpost.js.map