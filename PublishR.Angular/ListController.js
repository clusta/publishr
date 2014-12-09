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
    var ListController = (function (_super) {
        __extends(ListController, _super);
        function ListController(baseAddress, scope, location, routeParams, http, q) {
            _super.call(this, scope, http, q);
            this.baseAddress = baseAddress;
            this.scope = scope;
            this.location = location;
            this.routeParams = routeParams;
            this.http = http;
            this.q = q;
            scope.query = new publishr.Query();
            scope.refresh = _.bind(this.getFirstPage, this);
            scope.more = _.bind(this.getNextPage, this);
        }
        ListController.prototype.query = function (url, params, append) {
            var _this = this;
            this.buildHttpPromise('GET', url, params, null).success(function (d) {
                _this.onQuerySuccess(d, append);
            });
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
        ListController.prototype.transformModel = function (value, index, array) {
        };
        ListController.prototype.buildQueryParams = function (routeParams, query) {
            return {};
        };
        return ListController;
    })(publishr.HttpController);
    publishr.ListController = ListController;
})(publishr || (publishr = {}));
//# sourceMappingURL=ListController.js.map