/// <reference path="HttpController.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var publishr;
(function (publishr) {
    'use strict';
    var EditController = (function (_super) {
        __extends(EditController, _super);
        function EditController(baseAddress, scope, location, routeParams, http, q) {
            _super.call(this, scope, http, q);
            this.baseAddress = baseAddress;
            this.scope = scope;
            this.location = location;
            this.routeParams = routeParams;
            this.http = http;
            this.q = q;
            scope.save = _.bind(this.patchModel, this);
        }
        EditController.prototype.transformModel = function (model) {
            return model;
        };
        EditController.prototype.getModel = function () {
        };
        EditController.prototype.patchModel = function () {
            var _this = this;
            this.buildHttpPromise('PATCH', this.baseAddress, null, this.transformModel(this.scope.model)).success(function () {
                _this.onSaveSuccess();
            });
        };
        EditController.prototype.onSaveSuccess = function () {
        };
        return EditController;
    })(publishr.HttpController);
    publishr.EditController = EditController;
})(publishr || (publishr = {}));
//# sourceMappingURL=EditController.js.map