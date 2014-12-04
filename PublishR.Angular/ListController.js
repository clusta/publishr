var publishr;
(function (publishr) {
    'use strict';
    var ListController = (function () {
        function ListController(baseAddress, scope, location, routeParams, http, q) {
            this.baseAddress = baseAddress;
            this.scope = scope;
            this.location = location;
            this.routeParams = routeParams;
            this.http = http;
            this.q = q;
            scope.query = new publishr.Query();
            scope.refresh = _.bind(this.getFirstPage, this);
            scope.more = _.bind(this.getNextPage, this);
            scope.cancel = _.bind(this.onRequestCancel, this);
        }
        ListController.prototype.query = function (url, params, append) {
            var _this = this;
            if (!this.scope.busy) {
                this.cancellation = this.q.defer();
                var requestConfig = {
                    params: params,
                    timeout: this.cancellation.promise
                };
                this.onRequestStart();
                this.http.get(url, requestConfig).success(function (d) {
                    _this.onQuerySuccess(d, append);
                }).error(function () {
                    _this.onRequestError();
                }).finally(function () {
                    _this.onRequestEnd();
                });
            }
        };
        ListController.prototype.getFirstPage = function () {
            this.query(this.baseAddress, this.buildQueryParams(this.routeParams, this.scope.query), false);
        };
        ListController.prototype.getNextPage = function () {
            if (this.scope.data && this.scope.data.continuation && this.scope.data.continuation.next) {
                this.query(this.scope.data.continuation.next, null, true);
            }
        };
        ListController.prototype.onQuerySuccess = function (data, append) {
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
        };
        ListController.prototype.onRequestStart = function () {
            this.scope.busy = true;
        };
        ListController.prototype.onRequestEnd = function () {
            this.scope.busy = false;
        };
        ListController.prototype.onRequestCancel = function () {
            if (this.cancellation) {
                this.cancellation.resolve(null);
            }
        };
        ListController.prototype.onRequestSuccess = function () {
        };
        ListController.prototype.onRequestError = function () {
        };
        ListController.prototype.transformModel = function (value, index, array) {
        };
        ListController.prototype.buildQueryParams = function (routeParams, query) {
            return {};
        };
        return ListController;
    })();
    publishr.ListController = ListController;
})(publishr || (publishr = {}));
//# sourceMappingURL=ListController.js.map