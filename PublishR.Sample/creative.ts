﻿module publishr.sample {
    "use strict";

    class CreativeController extends publishr.client.CreativeController {
        buildCreative(fileSet: any): publishr.client.Creative {
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
        }
    }

    var states = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
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

    angular
        .module('creative', ['ui.router'])
        .constant('api', SampleApi)
        .service('alert', SampleAlert)
        .controller('Creative', CreativeController)
        .config(['$stateProvider', '$urlRouterProvider', states]);
} 