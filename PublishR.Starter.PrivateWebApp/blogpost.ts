module publishr.starter {
    "use strict";

    class SearchController extends publishr.client.SearchController {
        initialize() {
            this.search();
        }
    }

    class PageController extends publishr.client.PageController {

    }

    var states = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
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

    angular
        .module('blogpost', ['ui.router'])
        .controller('Search', SearchController)
        .controller('Page', PageController)
        .config(['$stateProvider', '$urlRouterProvider', states]);
} 