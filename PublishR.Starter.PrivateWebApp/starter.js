var publishr;
(function (publishr) {
    var starter;
    (function (starter) {
        "use strict";
        var StarterAlert = (function () {
            function StarterAlert() {
            }
            StarterAlert.prototype.showAlert = function (message) {
                window.alert(message);
            };
            return StarterAlert;
        })();
        starter.StarterAlert = StarterAlert;
        var bearerToken = window.localStorage.getItem('bearerToken');
        starter.StarterApi = {
            baseAddress: 'http://localhost:60423/api',
            config: {
                headers: {
                    Authorization: (bearerToken ? 'Bearer ' + bearerToken : null)
                }
            }
        };
    })(starter = publishr.starter || (publishr.starter = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=starter.js.map