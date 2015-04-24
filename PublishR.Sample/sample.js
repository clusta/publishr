var publishr;
(function (publishr) {
    var sample;
    (function (sample) {
        "use strict";
        var SampleAlert = (function () {
            function SampleAlert() {
            }
            SampleAlert.prototype.showAlert = function (message) {
                window.alert(message);
            };
            return SampleAlert;
        })();
        sample.SampleAlert = SampleAlert;
        var bearerToken = window.localStorage.getItem('bearerToken');
        sample.SampleApi = {
            baseAddress: '/api',
            config: {
                headers: {
                    Authorization: (bearerToken ? 'Bearer ' + bearerToken : null)
                }
            }
        };
    })(sample = publishr.sample || (publishr.sample = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=sample.js.map