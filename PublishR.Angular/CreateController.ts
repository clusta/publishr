module publishr {
    'use strict';

    export class CreateController<T> implements HttpController {
        private cancellation: ng.IDeferred<{}>;

        constructor(
            public baseAddress: string,
            public scope: CreateScope<T>,
            public routeParams: ng.route.IRouteParamsService,
            public http: ng.IHttpService,
            public q: ng.IQService) {

            scope.model = this.createModel();
            scope.save = _.bind(this.postModel, this);
            scope.cancel = _.bind(this.onRequestCancel, this);
        }

        createModel(): T {
            return <T>{};
        }

        transformModel(model: T): any {
            return model;
        } 

        postModel() {
            if (!this.scope.busy) {
                this.cancellation = this.q.defer();

                var requestConfig: ng.IRequestShortcutConfig = {
                    timeout: this.cancellation.promise
                };

                this.onRequestStart();

                this.http.post(this.baseAddress, this.transformModel(this.scope.model), requestConfig)
                    .success(() => {
                        this.onPostSuccess();
                    })
                    .error(() => {
                        this.onRequestError();
                    })
                    .finally(() => {
                        this.onRequestEnd();
                    });
            }
        }

        onPostSuccess() {

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