var publishr;
(function (publishr) {
    'use strict';
    var HttpController = (function () {
        function HttpController(scope, http, q) {
            this.scope = scope;
            this.http = http;
            this.q = q;
            scope.cancel = _.bind(this.onRequestCancel, this);
        }
        HttpController.prototype.buildHttpPromise = function (method, url, params, data) {
            var _this = this;
            if (this.onRequestStart()) {
                this.scope.busy = true;
                this.cancellation = this.q.defer();
                var httpPromise = this.http({
                    method: method,
                    url: url,
                    params: params,
                    data: data,
                    timeout: this.cancellation.promise
                });
                httpPromise.error(function () {
                    _this.onRequestError();
                }).finally(function () {
                    _this.onRequestEnd();
                });
                return httpPromise;
            }
            else {
                var emptyPromise = this.q.reject();
                emptyPromise["succcess"] = function (callback) {
                    return _this;
                };
                emptyPromise["error"] = function (callback) {
                    return _this;
                };
                return emptyPromise;
            }
        };
        HttpController.prototype.onRequestStart = function () {
            return !this.scope.busy;
        };
        HttpController.prototype.onRequestEnd = function () {
            this.scope.busy = false;
        };
        HttpController.prototype.onRequestCancel = function () {
            if (this.cancellation) {
                this.cancellation.resolve(null);
            }
        };
        HttpController.prototype.onRequestError = function () {
        };
        return HttpController;
    })();
    publishr.HttpController = HttpController;
})(publishr || (publishr = {}));
//# sourceMappingURL=HttpController.js.map