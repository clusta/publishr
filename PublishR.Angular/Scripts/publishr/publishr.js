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
    var HttpController = (function () {
        function HttpController(scope, http, q) {
            var _this = this;
            this.scope = scope;
            this.http = http;
            this.q = q;
            scope.cancel = function () {
                _this.onRequestCancel();
            };
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
            var _this = this;
            _super.call(this, scope, http, q);
            this.baseAddress = baseAddress;
            this.scope = scope;
            this.location = location;
            this.routeParams = routeParams;
            this.http = http;
            this.q = q;
            scope.mode = 3 /* Create */;
            scope.model = this.createModel();
            scope.save = function (form) {
                _this.save(form);
            };
        }
        CreateController.prototype.createModel = function () {
            return {};
        };
        CreateController.prototype.transformModel = function (model) {
            return model;
        };
        CreateController.prototype.postModel = function (model) {
            return this.buildHttpPromise('POST', this.baseAddress, null, this.transformModel(model));
        };
        CreateController.prototype.save = function (form) {
            var _this = this;
            if (form && form.$invalid) {
                return;
            }
            this.postModel(this.scope.model).success(function () {
                _this.onSaveSuccess();
            });
        };
        CreateController.prototype.onSaveSuccess = function () {
        };
        return CreateController;
    })(publishr.HttpController);
    publishr.CreateController = CreateController;
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    'use strict';
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
    var DetailController = (function (_super) {
        __extends(DetailController, _super);
        function DetailController(baseAddress, scope, location, routeParams, http, q) {
            _super.call(this, scope, http, q);
            this.baseAddress = baseAddress;
            this.scope = scope;
            this.location = location;
            this.routeParams = routeParams;
            this.http = http;
            this.q = q;
            scope.mode = 1 /* Detail */;
        }
        DetailController.prototype.getModel = function (id) {
            var _this = this;
            return this.buildHttpPromise('GET', this.buildUrl(id), this.buildQueryParams(this.routeParams), null).success(function (model) {
                _this.scope.model = _this.transformViewModel(model);
            });
        };
        DetailController.prototype.transformViewModel = function (model) {
            return model;
        };
        DetailController.prototype.buildUrl = function (id) {
            return this.baseAddress + '/' + id;
        };
        DetailController.prototype.buildQueryParams = function (routeParams) {
            return {};
        };
        return DetailController;
    })(publishr.HttpController);
    publishr.DetailController = DetailController;
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    'use strict';
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    'use strict';
    var EditController = (function (_super) {
        __extends(EditController, _super);
        function EditController(baseAddress, scope, location, routeParams, http, q) {
            var _this = this;
            _super.call(this, scope, http, q);
            this.baseAddress = baseAddress;
            this.scope = scope;
            this.location = location;
            this.routeParams = routeParams;
            this.http = http;
            this.q = q;
            scope.mode = 2 /* Edit */;
            scope.save = function (form) {
                _this.save(form);
            };
        }
        EditController.prototype.transformModel = function (model) {
            return model;
        };
        EditController.prototype.transformViewModel = function (model) {
            return model;
        };
        EditController.prototype.getModel = function (id) {
            var _this = this;
            return this.buildHttpPromise('GET', this.buildUrl(id), this.buildQueryParams(this.routeParams), null).success(function (model) {
                _this.scope.model = _this.transformViewModel(model);
            });
        };
        EditController.prototype.patchModel = function (id, model) {
            return this.buildHttpPromise('PATCH', this.buildUrl(id), null, this.transformModel(model));
        };
        EditController.prototype.save = function (form) {
            var _this = this;
            if (form && form.$invalid) {
                return;
            }
            this.patchModel(this.scope.model['id'], this.scope.model).success(function () {
                _this.onSaveSuccess();
            });
        };
        EditController.prototype.buildUrl = function (id) {
            return this.baseAddress + '/' + id;
        };
        EditController.prototype.buildQueryParams = function (routeParams) {
            return {};
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
    var ListController = (function (_super) {
        __extends(ListController, _super);
        function ListController(baseAddress, scope, location, routeParams, http, q) {
            var _this = this;
            _super.call(this, scope, http, q);
            this.baseAddress = baseAddress;
            this.scope = scope;
            this.location = location;
            this.routeParams = routeParams;
            this.http = http;
            this.q = q;
            scope.mode = 0 /* List */;
            scope.query = new publishr.Query();
            scope.refresh = function () {
                _this.getFirstPage();
            };
            scope.more = function () {
                _this.getNextPage();
            };
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
                data.value.forEach(this.transformViewModel);
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
        ListController.prototype.transformViewModel = function (value, index, array) {
        };
        ListController.prototype.buildQueryParams = function (routeParams, query) {
            return {};
        };
        return ListController;
    })(publishr.HttpController);
    publishr.ListController = ListController;
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    'use strict';
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    'use strict';
    (function (Mode) {
        Mode[Mode["List"] = 0] = "List";
        Mode[Mode["Detail"] = 1] = "Detail";
        Mode[Mode["Edit"] = 2] = "Edit";
        Mode[Mode["Create"] = 3] = "Create";
    })(publishr.Mode || (publishr.Mode = {}));
    var Mode = publishr.Mode;
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
//# sourceMappingURL=publishr.js.map