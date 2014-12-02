module publishr {
    'use strict';

    export class FeedController {
        private canceller: ng.IDeferred<{}>;

        constructor(
            public uri: string,
            public $scope: FeedScope,
            public $route: ng.route.IRouteParamsService,
            public $http: ng.IHttpService,
            public $q: ng.IQService) {

            $scope.query = new Query();
            $scope.data = null;
            $scope.load = jQuery.proxy(this.load, this);
            $scope.next = jQuery.proxy(this.next, this);
            $scope.cancel = jQuery.proxy(this.cancel, this);
            $scope.busy = false;
        }

        query(url: string, params: any, replace: boolean) {
            if (!this.$scope.busy) {
                this.canceller = this.$q.defer();

                var config: ng.IRequestShortcutConfig = {
                    params: params,
                    timeout: this.canceller.promise
                };

                this.$scope.busy = true;

                this.$http.get(url, config)
                    .success(d => {
                        this.success(<Data>d, replace);
                    })
                    .error(this.error)
                    .finally(() => {
                        this.$scope.busy = false;
                    });
            }
        }

        load() {
            this.query(this.uri, this.params(this.$route, this.$scope.query), true);
        }

        next() {
            if (this.$scope.data && this.$scope.data.continuation && this.$scope.data.continuation.next) {
                this.query(this.$scope.data.continuation.next, null, false);
            }
        }

        success(data: Data, replace: boolean) {
            if (data && data.value) {
                data.value.forEach(this.transform);

                if (replace) {
                    this.$scope.data = data;
                }
                else {
                    this.$scope.data.continuation = data.continuation;

                    for (var i = 0; i < data.value.length; i++) {
                        this.$scope.data.value.push(data.value[i]);
                    }
                }
            }
        }

        error() {

        }

        cancel() {
            this.canceller.resolve(null);
        }

        transform(value: any, index: number, array: any[]) {

        }

        params($rootParams: ng.route.IRouteParamsService, query: Query) {
            return {};
        }
    }
}