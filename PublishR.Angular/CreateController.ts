/// <reference path="HttpController.ts"/>

module publishr {
    'use strict';

    export class CreateController<TModel> extends HttpController<CreateScope<TModel>> {
        constructor(
            public baseAddress: string,
            public scope: CreateScope<TModel>,
            public location: ng.ILocationService,
            public routeParams: ng.route.IRouteParamsService,
            public http: ng.IHttpService,
            public q: ng.IQService) {

            super(scope, http, q);

            scope.model = this.createModel();
            scope.save = _.bind(this.postModel, this);
        }

        createModel(): TModel {
            return <TModel>{};
        }

        transformModel(model: TModel): any {
            return model;
        } 

        postModel() {
            this.buildHttpPromise('POST', this.baseAddress, null, this.transformModel(this.scope.model))
                .success(() => {
                    this.onPostSuccess();
                });
        }

        onPostSuccess() {

        }
    }
}