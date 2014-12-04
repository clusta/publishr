module publishr {
    'use strict';

    export class ListController implements HttpController {
        private cancellation: ng.IDeferred<{}>;

        constructor(
            public baseAddress: string,
            public scope: ListScope,
            public location: ng.ILocationService,
            public routeParams: ng.route.IRouteParamsService,
            public http: ng.IHttpService,
            public q: ng.IQService) {

            scope.query = new Query();
            scope.refresh = _.bind(this.getFirstPage, this);
            scope.more = _.bind(this.getNextPage, this);
            scope.cancel = _.bind(this.onRequestCancel, this);
        }

        query(url: string, params: any, append: boolean) {
            if (!this.scope.busy) {
                this.cancellation = this.q.defer();

                var requestConfig: ng.IRequestShortcutConfig = {
                    params: params,
                    timeout: this.cancellation.promise
                };

                this.onRequestStart();

                this.http.get(url, requestConfig)
                    .success(d => {
                        this.onQuerySuccess(<Data>d, append);
                    })
                    .error(() => {
                        this.onRequestError();
                    })
                    .finally(() => {
                        this.onRequestEnd();
                    });
            }
        }

        getFirstPage() {
            this.query(this.baseAddress, this.buildQueryParams(this.routeParams, this.scope.query), false);
        }

        getNextPage() {
            if (this.scope.data && this.scope.data.continuation && this.scope.data.continuation.next) {
                this.query(this.scope.data.continuation.next, null, true);
            }
        }

        onQuerySuccess(data: Data, append: boolean) {
            if (data && data.value) {
                data.value.forEach(this.transformModel);

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

        onRequestSuccess() {

        }

        onRequestError() {

        }

        transformModel(value: any, index: number, array: any[]) {

        }

        buildQueryParams(routeParams: ng.route.IRouteParamsService, query: Query) {
            return {};
        }
    }
}