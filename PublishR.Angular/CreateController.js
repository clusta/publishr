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
    var CreateController = (function (_super) {
        __extends(CreateController, _super);
        function CreateController(baseAddress, scope, location, routeParams, http, q) {
            _super.call(this, scope, http, q);
            this.baseAddress = baseAddress;
            this.scope = scope;
            this.location = location;
            this.routeParams = routeParams;
            this.http = http;
            this.q = q;
            scope.model = this.createModel();
            scope.save = _.bind(this.postModel, this);
        }
        CreateController.prototype.createModel = function () {
            return {};
        };
        CreateController.prototype.transformModel = function (model) {
            return model;
        };
        CreateController.prototype.postModel = function () {
            var _this = this;
            this.buildHttpPromise('POST', this.baseAddress, null, this.transformModel(this.scope.model)).success(function () {
                _this.onPostSuccess();
            });
        };
        CreateController.prototype.onPostSuccess = function () {
        };
        return CreateController;
    })(publishr.HttpController);
    publishr.CreateController = CreateController;
})(publishr || (publishr = {}));
//# sourceMappingURL=CreateController.js.map