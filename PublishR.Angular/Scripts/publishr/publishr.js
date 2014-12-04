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
//# sourceMappingURL=publishr.js.map