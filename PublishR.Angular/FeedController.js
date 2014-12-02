var publishr;
(function (publishr) {
    'use strict';

    var FeedController = (function () {
        function FeedController(uri, $scope, $route, $http, $q) {
            this.uri = uri;
            this.$scope = $scope;
            this.$route = $route;
            this.$http = $http;
            this.$q = $q;
            $scope.query = new publishr.Query();
            $scope.load = this.load;
            $scope.next = this.next;
        }
        FeedController.prototype.query = function (url, params, replace) {
            var _this = this;
            if (!this.$scope.busy) {
                var config = {
                    params: params,
                    timeout: this.canceller.promise
                };

                this.canceller = this.$q.defer();
                this.$scope.busy = true;

                this.$http.get(this.uri, config).success(function (d) {
                    _this.success(d, replace);
                }).error(this.error).finally(function () {
                    _this.$scope.busy = false;
                });
            }
        };

        FeedController.prototype.load = function () {
            this.query(this.uri, this.params(this.$route, this.$scope.query), true);
        };

        FeedController.prototype.next = function () {
            if (this.$scope.data && this.$scope.data.continuation && this.$scope.data.continuation.next) {
                this.query(this.$scope.data.continuation.next, null, false);
            }
        };

        FeedController.prototype.success = function (data, replace) {
            if (data && data.value) {
                data.value.forEach(this.transform);

                if (replace) {
                    this.$scope.data = data;
                } else {
                    this.$scope.data.continuation = data.continuation;
                    this.$scope.data.value.push(data.value);
                }
            }
        };

        FeedController.prototype.error = function () {
        };

        FeedController.prototype.cancel = function () {
            this.canceller.resolve(null);
        };

        FeedController.prototype.transform = function (value, index, array) {
        };

        FeedController.prototype.params = function ($rootParams, query) {
            return {};
        };
        return FeedController;
    })();
    publishr.FeedController = FeedController;
})(publishr || (publishr = {}));
//# sourceMappingURL=FeedController.js.map
