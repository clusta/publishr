var publishr;
(function (publishr) {
    'use strict';
    var Constants = (function () {
        function Constants() {
        }
        Constants.$inject = ['$scope', '$location', '$routeParams', '$http', '$q'];
        return Constants;
    })();
    publishr.Constants = Constants;
})(publishr || (publishr = {}));
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
var publishr;
(function (publishr) {
    'use strict';
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    'use strict';
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    'use strict';
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    'use strict';
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    'use strict';
    var Query = (function () {
        function Query() {
        }
        return Query;
    })();
    publishr.Query = Query;
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    'use strict';
    var Continuation = (function () {
        function Continuation() {
        }
        return Continuation;
    })();
    publishr.Continuation = Continuation;
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    'use strict';
    var Data = (function () {
        function Data() {
        }
        return Data;
    })();
    publishr.Data = Data;
})(publishr || (publishr = {}));
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
//# sourceMappingURL=publishr.js.map