var publishr;
(function (publishr) {
    'use strict';
    var CreateController = (function () {
        function CreateController(baseAddress, scope, location, routeParams, http, q) {
            this.baseAddress = baseAddress;
            this.scope = scope;
            this.location = location;
            this.routeParams = routeParams;
            this.http = http;
            this.q = q;
            scope.model = this.createModel();
            scope.save = _.bind(this.postModel, this);
            scope.cancel = _.bind(this.onRequestCancel, this);
        }
        CreateController.prototype.createModel = function () {
            return {};
        };
        CreateController.prototype.transformModel = function (model) {
            return model;
        };
        CreateController.prototype.postModel = function () {
            var _this = this;
            if (!this.scope.busy) {
                this.cancellation = this.q.defer();
                var requestConfig = {
                    timeout: this.cancellation.promise
                };
                this.onRequestStart();
                this.http.post(this.baseAddress, this.transformModel(this.scope.model), requestConfig).success(function () {
                    _this.onPostSuccess();
                }).error(function () {
                    _this.onRequestError();
                }).finally(function () {
                    _this.onRequestEnd();
                });
            }
        };
        CreateController.prototype.onPostSuccess = function () {
        };
        CreateController.prototype.onRequestStart = function () {
            this.scope.busy = true;
        };
        CreateController.prototype.onRequestEnd = function () {
            this.scope.busy = false;
        };
        CreateController.prototype.onRequestCancel = function () {
            if (this.cancellation) {
                this.cancellation.resolve(null);
            }
        };
        CreateController.prototype.onRequestError = function () {
        };
        return CreateController;
    })();
    publishr.CreateController = CreateController;
})(publishr || (publishr = {}));
//# sourceMappingURL=CreateController.js.map