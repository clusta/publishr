/// <reference path="HttpController.ts"/>

module publishr {
    'use strict';

    export class ListController extends HttpController<ListScope> {
        constructor(
            public baseAddress: string,
            public scope: ListScope,
            public location: ng.ILocationService,
            public routeParams: ng.route.IRouteParamsService,
            public http: ng.IHttpService,
            public q: ng.IQService) {

            super(scope, http, q);

            scope.mode = Mode.List;
            scope.query = new Query();

            scope.refresh = () => {
                this.getFirstPage();
            };

            scope.more = () => {
                this.getNextPage();
            };
        }

        query(url: string, params: any, append: boolean): void {
            this.buildHttpPromise<Data>('GET', url, params, null)
                .success(d => {
                    this.onQuerySuccess(d, append);
                });
        }

        getFirstPage(): void {
            this.query(this.baseAddress, this.buildQueryParams(this.routeParams, this.scope.query), false);
        }

        getNextPage(): void {
            if (this.scope.data && this.scope.data.continuation && this.scope.data.continuation.next) {
                this.query(this.scope.data.continuation.next, null, true);
            }
        }

        onQuerySuccess(data: Data, append: boolean): void {
            if (data && data.value) {
                data.value.forEach(this.transformViewModel);

                if (append) {
                    this.scope.data.continuation = data.continuation;

                    for (var i = 0; i < data.value.length; i++) {
                        this.scope.data.value.push(data.value[i]);
                    }
                }
                else {
                    this.scope.data = data;
                }
            }
        }

        transformViewModel(value: any, index: number, array: any[]): void {

        }

        buildQueryParams(routeParams: ng.route.IRouteParamsService, query: Query): any {
            return Utils.copyLeft(routeParams, query);
        }
    }
}