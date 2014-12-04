module publishr {
    'use strict';

    export class EditController<T> implements HttpController {
        private cancellation: ng.IDeferred<{}>;

        constructor(
            public baseAddress: string,
            public scope: EditScope<T>,
            public location: ng.ILocationService,
            public routeParams: ng.route.IRouteParamsService,
            public http: ng.IHttpService,
            public q: ng.IQService) {

            scope.save = _.bind(this.patchModel, this);
            scope.cancel = _.bind(this.onRequestCancel, this);
        }

        createModel(): T {
            return <T>{};
        }

        transformModel(model: T): any {
            return model;
        } 

        getModel() {

        }

        patchModel() {
            if (!this.scope.busy) {
                this.cancellation = this.q.defer();

                var requestConfig: ng.IRequestShortcutConfig = {
                    timeout: this.cancellation.promise
                };

                this.onRequestStart();

                this.http.post(this.baseAddress, this.transformModel(this.scope.model), requestConfig)
                    .success(() => {
                        this.onSaveSuccess();
                    })
                    .error(() => {
                        this.onRequestError();
                    })
                    .finally(() => {
                        this.onRequestEnd();
                    });
            }
        }

        onSaveSuccess() {

        }

        onRequestStart() {
            this.scope.busy = true;
        }

        onRequestEnd() {
            this.scope.busy = false;
        }

        onRequestCancel() {
            if (this.cancellation) {
                this.cancellation.resolve(null);
            }
        }

        onRequestError() {

        }
    }
}