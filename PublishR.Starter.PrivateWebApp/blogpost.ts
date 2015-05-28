module publishr.starter {
    "use strict";

    class ListController extends publishr.client.SearchController {
        initialize() {
            this.state.kind = 'blog_post';
            this.state.state = 'draft';

            this.search();
        }
    }

    class CreateController extends publishr.client.PageController {
        initialize() {
            this.scope.create = this.buildCreatePageScope('blog_post');
        }

        createPageSuccess(resource: publishr.client.Resource<publishr.client.Page>) {
            this.location.url('/list');
        }
    }

    class DetailsController extends publishr.client.PageController {
        initialize() {
            this.getPage();
        }
    }

    class CommentController extends publishr.client.CommentController {
        initialize() {
            this.state.path = this.state["id"];
            this.list();

            super.initialize();
        }
    }

    class EditController extends publishr.client.PageController {
        initialize() {
            this.getPage();
        }

        updateCardsSuccess() {
            this.location.url('/list');
        }
    }

    var states = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
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

    angular
        .module('blogpost', ['ui.router'])
        .constant('api', StarterApi)
        .service('alert', StarterAlert)
        .controller('List', ListController)
        .controller('Create', CreateController)
        .controller('Details', DetailsController)
        .controller('Comment', CommentController)
        .controller('Edit', EditController)
        .config(['$stateProvider', '$urlRouterProvider', states]);
} 