module publishr.sample {
    "use strict";

    class ListController extends publishr.client.SearchController {
        initialize() {
            this.scope.parameters = {
                kind: 'blog_post',
                state: 'draft'
            };

            this.query();
        }
    }

    class CreateController extends publishr.client.PageController {
        initialize() {
            this.scope.create = {
                kind: 'blog_post',
                slug: null,
                card: null
            };
        }

        createPageSuccess(resource: publishr.client.Resource) {
            this.location.url('/list');
        }
    }

    class DetailsController extends publishr.client.PageController {
        initialize() {
            this.getPage();
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
            url: '/list',
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
            controller: 'Details',
            templateUrl: 'Details.html'
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
        .constant('api', SampleApi)
        .service('alert', SampleAlert)
        .controller('List', ListController)
        .controller('Create', CreateController)
        .controller('Details', DetailsController)
        .controller('Edit', EditController)
        .config(['$stateProvider', '$urlRouterProvider', states]);
} 