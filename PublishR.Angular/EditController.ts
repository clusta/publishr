/// <reference path="HttpController.ts"/>

module publishr {
    'use strict';

    export class EditController<TModel> extends HttpController<EditScope<TModel>> {
        constructor(
            public baseAddress: string,
            public scope: EditScope<TModel>,
            public location: ng.ILocationService,
            public routeParams: ng.route.IRouteParamsService,
            public http: ng.IHttpService,
            public q: ng.IQService) {

            super(scope, http, q);

            scope.mode = Mode.Edit;

            scope.save = (form: ng.IFormController) => {
                this.save(form);
            };
        }

        transformModel(model: TModel): any {
            return model;
        } 

        transformViewModel(model: TModel): any {
            return model;
        } 

        getModel(id: string): ng.IHttpPromise<TModel> {
            return this.buildHttpPromise<TModel>('GET', this.buildUrl(id), this.buildQueryParams(this.routeParams), null)
                .success((model: TModel) => {
                    this.scope.model = this.transformViewModel(model);
                });
        }

        patchModel(id: string, model: TModel): ng.IHttpPromise<{}> {
            return this.buildHttpPromise('PATCH', this.buildUrl(id), null, this.transformModel(model));
        }

        save(form: ng.IFormController): void {
            if (form && form.$invalid) {
                return;
            }

            this.patchModel(this.scope.model['id'], this.scope.model)
                .success(() => {
                    this.onSaveSuccess();
                });
        }

        buildUrl(id: string): string {
            return this.baseAddress + '/' + id;
        }

        buildQueryParams(routeParams: ng.route.IRouteParamsService): any {
            return Utils.copyLeft(routeParams);
        }

        onSaveSuccess(): void {

        }
    }
}