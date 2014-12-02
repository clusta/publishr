module publishr {
    'use strict';

    export class FeedController {
        private canceller: ng.IDeferred<{}>;

        constructor(
            private uri: string,
            private $scope: FeedScope,
            private $route: ng.route.IRouteParamsService,
            private $http: ng.IHttpService,
            private $q: ng.IQService) {

            $scope.query = new Query();
            $scope.load = this.load;
            $scope.next = this.next;
        }

        query(url: string, params: any, replace: boolean) {
            if (!this.$scope.busy) {
                var config: ng.IRequestShortcutConfig = {
                    params: params,
                    timeout: this.canceller.promise
                };

                this.canceller = this.$q.defer();
                this.$scope.busy = true;

                this.$http.get(this.uri, config)
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
                    this.$scope.data.value.push(data.value);
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