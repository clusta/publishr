﻿module publishr.starter {
    "use strict";

    class SearchController extends publishr.client.SearchController {
        initialize() {
            this.search();
        }
    }

    class PageController extends publishr.client.PageController {
        createPage(form?: ng.IFormController) {
            this.scope.create.data.cards['medium'].title = this.scope.create.data.regions['main'].sections[0].blocks['header'].text;

            super.createPage(form);
        }
    }

    var states = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state('search', {
            url: '/search?tag&state',
            controller: 'Search',
            templateUrl: 'Search.html',
            params: {
                kind: 'web_page'
            }
        });
        $stateProvider.state('create', {
            url: '/create',
            controller: 'Page',
            templateUrl: 'Create.html',
            params: {
                kind: 'web_page',
                redirect: '/page#/search'
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
                redirect: '/page#/search'
            }
        });
        $urlRouterProvider.otherwise("/search");
    };

    angular
        .module('page', ['ui.router'])
        .controller('Search', SearchController)
        .controller('Page', PageController)
        .config(['$stateProvider', '$urlRouterProvider', states]);
} 