module publishr.sample {
    "use strict";

    class WallController {
        constructor(
            public scope: WallScope,
            public http: ng.IHttpService,
            public api: publishr.client.IApi) {
            
            this.loadWall();
        }
        
        getWallUri(): string {
            return publishr.client.UriHelpers.join(this.api.baseAddress, 'wall');
        }

        loadWall() {
            this.http
                .get<{}>(this.getWallUri())
                .success(r => this.loadWallSuccess(r));
        }
        
        loadWallSuccess(wall: any) {
            this.scope.wall = wall;
        }        
        
        static $inject = ["$scope", "$http", "api"];          
    }

    interface WallScope {
        wall: any;
    }

    var routes = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state('wall', {
            url: '/wall',
            controller: 'Wall',
            templateUrl: 'Wall.html'
        });
        $urlRouterProvider.otherwise("/wall");
    };

    angular
        .module('wall', ['ui.router'])
        .constant('api', SampleApi)
        .service('alert', SampleAlert)
        .controller('Wall', WallController)
        .config(['$stateProvider', '$urlRouterProvider', routes]);
} 