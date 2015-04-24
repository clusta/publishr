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
                cover: null
            };
        }
    }

    angular
        .module('blogpost', ['ui.router'])
        .constant('api', SampleApi)
        .service('alert', SampleAlert)
        .controller('List', ListController)
        .controller('Create', CreateController)
        .config(['$stateProvider', '$urlRouterProvider', ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
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
            $urlRouterProvider.otherwise("/list");
    }]);
} 