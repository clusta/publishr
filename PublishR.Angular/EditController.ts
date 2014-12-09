/// <reference path="HttpController.ts"/>

module publishr {
    'use strict';

    export class EditController<T> extends HttpController<EditScope<T>> {
        constructor(
            public baseAddress: string,
            public scope: EditScope<T>,
            public location: ng.ILocationService,
            public routeParams: ng.route.IRouteParamsService,
            public http: ng.IHttpService,
            public q: ng.IQService) {

            super(scope, http, q);

            scope.save = _.bind(this.patchModel, this);
        }

        transformModel(model: T): any {
            return model;
        } 

        getModel() {

        }

        patchModel() {
            this.buildHttpPromise('PATCH', this.baseAddress, null, this.transformModel(this.scope.model))
                .success(() => {
                    this.onSaveSuccess();
                });
        }

        onSaveSuccess() {

        }
    }
}