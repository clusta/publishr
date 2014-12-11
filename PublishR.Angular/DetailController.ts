/// <reference path="HttpController.ts"/>

module publishr {
    'use strict';

    export class DetailController<TModel> extends HttpController<DetailScope<TModel>> {
        constructor(
            public baseAddress: string,
            public scope: DetailScope<TModel>,
            public location: ng.ILocationService,
            public routeParams: ng.route.IRouteParamsService,
            public http: ng.IHttpService,
            public q: ng.IQService) {

            super(scope, http, q);

            scope.mode = Mode.Detail;
        }

        getModel(id: string): ng.IHttpPromise<TModel> {
            return this.buildHttpPromise<TModel>('GET', this.buildUrl(id), this.buildQueryParams(this.routeParams), null)
                .success((model: TModel) => {
                    this.scope.model = this.transformViewModel(model);
                });
        }

        transformViewModel(model: TModel): any {
            return model;
        } 

        buildUrl(id: string): string {
            return this.baseAddress + '/' + id;
        }

        buildQueryParams(routeParams: ng.route.IRouteParamsService): any {
            return Utils.copyLeft(routeParams);
        }
    }
}