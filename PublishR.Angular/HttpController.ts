module publishr {
    'use strict';

    export class HttpController<TScope extends HttpScope> {
        protected cancellation: ng.IDeferred<{}>;

        constructor(
            public scope: TScope,
            public http: ng.IHttpService,
            public q: ng.IQService) {

            scope.cancel = _.bind(this.onRequestCancel, this);
        }

        buildHttpPromise<T>(method: string, url: string, params: any, data: any) : ng.IHttpPromise<T> {
            if (this.onRequestStart()) {
                this.scope.busy = true;
                this.cancellation = this.q.defer();

                var httpPromise = this.http<T>({
                    method: method,
                    url: url,
                    params: params,
                    data: data,
                    timeout: this.cancellation.promise
                });

                httpPromise
                    .error(() => {
                        this.onRequestError();
                    })
                    .finally(() => {
                        this.onRequestEnd();
                    });

                return httpPromise;
            }
            else {
                var emptyPromise = this.q.reject();

                emptyPromise["succcess"] = (callback: ng.IHttpPromiseCallback<T>) => {
                    return this;
                };

                emptyPromise["error"] = (callback: ng.IHttpPromiseCallback<any>) => {
                    return this;
                };

                return <ng.IHttpPromise<T>>emptyPromise;
            }
        }

        onRequestStart(): boolean {
            return !this.scope.busy;
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