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
    var FeedController = (function () {
        function FeedController(uri, $scope, $route, $http, $q) {
            this.uri = uri;
            this.$scope = $scope;
            this.$route = $route;
            this.$http = $http;
            this.$q = $q;
            $scope.query = new publishr.Query();
            $scope.data = null;
            $scope.load = jQuery.proxy(this.load, this);
            $scope.next = jQuery.proxy(this.next, this);
            $scope.cancel = jQuery.proxy(this.cancel, this);
            $scope.busy = false;
        }
        FeedController.prototype.query = function (url, params, replace) {
            var _this = this;
            if (!this.$scope.busy) {
                this.canceller = this.$q.defer();
                var config = {
                    params: params,
                    timeout: this.canceller.promise
                };
                this.$scope.busy = true;
                this.$http.get(url, config).success(function (d) {
                    _this.success(d, replace);
                }).error(this.error).finally(function () {
                    _this.$scope.busy = false;
                });
            }
        };
        FeedController.prototype.load = function () {
            this.query(this.uri, this.params(this.$route, this.$scope.query), true);
        };
        FeedController.prototype.next = function () {
            if (this.$scope.data && this.$scope.data.continuation && this.$scope.data.continuation.next) {
                this.query(this.$scope.data.continuation.next, null, false);
            }
        };
        FeedController.prototype.success = function (data, replace) {
            if (data && data.value) {
                data.value.forEach(this.transform);
                if (replace) {
                    this.$scope.data = data;
                }
                else {
                    this.$scope.data.continuation = data.continuation;
                    for (var i = 0; i < data.value.length; i++) {
                        this.$scope.data.value.push(data.value[i]);
                    }
                }
            }
        };
        FeedController.prototype.error = function () {
        };
        FeedController.prototype.cancel = function () {
            this.canceller.resolve(null);
        };
        FeedController.prototype.transform = function (value, index, array) {
        };
        FeedController.prototype.params = function ($rootParams, query) {
            return {};
        };
        return FeedController;
    })();
    publishr.FeedController = FeedController;
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
//# sourceMappingURL=publishr.js.map