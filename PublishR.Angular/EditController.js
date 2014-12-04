var publishr;
(function (publishr) {
    'use strict';
    var EditController = (function () {
        function EditController(baseAddress, scope, location, routeParams, http, q) {
            this.baseAddress = baseAddress;
            this.scope = scope;
            this.location = location;
            this.routeParams = routeParams;
            this.http = http;
            this.q = q;
            scope.save = _.bind(this.patchModel, this);
            scope.cancel = _.bind(this.onRequestCancel, this);
        }
        EditController.prototype.createModel = function () {
            return {};
        };
        EditController.prototype.transformModel = function (model) {
            return model;
        };
        EditController.prototype.getModel = function () {
        };
        EditController.prototype.patchModel = function () {
            var _this = this;
            if (!this.scope.busy) {
                this.cancellation = this.q.defer();
                var requestConfig = {
                    timeout: this.cancellation.promise
                };
                this.onRequestStart();
                this.http.post(this.baseAddress, this.transformModel(this.scope.model), requestConfig).success(function () {
                    _this.onSaveSuccess();
                }).error(function () {
                    _this.onRequestError();
                }).finally(function () {
                    _this.onRequestEnd();
                });
            }
        };
        EditController.prototype.onSaveSuccess = function () {
        };
        EditController.prototype.onRequestStart = function () {
            this.scope.busy = true;
        };
        EditController.prototype.onRequestEnd = function () {
            this.scope.busy = false;
        };
        EditController.prototype.onRequestCancel = function () {
            if (this.cancellation) {
                this.cancellation.resolve(null);
            }
        };
        EditController.prototype.onRequestError = function () {
        };
        return EditController;
    })();
    publishr.EditController = EditController;
})(publishr || (publishr = {}));
//# sourceMappingURL=EditController.js.map