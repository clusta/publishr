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

            scope.mode = Mode.Create;
            scope.model = this.createModel();

            scope.save = (form: ng.IFormController) => {
                this.save(form);
            };
        }

        createModel(): TModel {
            return <TModel>{};
        }

        transformModel(model: TModel): any {
            return model;
        } 

        postModel(model: TModel): ng.IHttpPromise<{}> {
            return this.buildHttpPromise('POST', this.baseAddress, null, this.transformModel(model));
        }

        save(form: ng.IFormController): void {
            if (form && form.$invalid) {
                return;
            }

            this.postModel(this.scope.model)
                .success(() => {
                    this.onSaveSuccess();
                });
        }

        onSaveSuccess(): void {

        }
    }
}