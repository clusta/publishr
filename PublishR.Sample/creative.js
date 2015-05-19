var publishr;
(function (publishr) {
    var sample;
    (function (sample) {
        "use strict";
        var CreativeController = (function () {
            function CreativeController(scope, state, location, http, api, alert) {
                var _this = this;
                this.scope = scope;
                this.state = state;
                this.location = location;
                this.http = http;
                this.api = api;
                this.alert = alert;
                this.win = window;
                this.scope.upload = function () { return _this.createFiles(); };
            }
            CreativeController.prototype.getFileUri = function (setname) {
                return publishr.client.UriHelpers.join(this.api.baseAddress, 'file', setname);
            };
            CreativeController.prototype.getImageFile = function () {
                var fileInput = document.getElementsByName('image')[0];
                return fileInput['files'][0];
            };
            CreativeController.prototype.createFiles = function () {
                var _this = this;
                var supportsFileApi = this.win.File && this.win.FileReader && this.win.FileList;
                if (!supportsFileApi) {
                    this.alert.showAlert('File API required');
                    return;
                }
                var fileInfo = this.getImageFile();
                var file = {
                    name: fileInfo.name,
                    mimetype: fileInfo.type
                };
                var model = {
                    'image': file
                };
                this.http.post(this.getFileUri('creative1'), model, this.api.config).success(function (resource) { return _this.createFilesSuccess(resource); }).error(function (d, s) { return _this.createFilesError(d, s); });
            };
            CreativeController.prototype.createFilesSuccess = function (endpoints) {
                var _this = this;
                this.endpoints = endpoints;
                // PUT BLOB: https://msdn.microsoft.com/en-us/library/azure/dd179451.aspx
                // FileReader API: http://www.html5rocks.com/en/tutorials/file/dndfiles/
                var fileReader = new this.win.FileReader();
                var fileInfo = this.getImageFile();
                fileReader.onload = function (reader) {
                    var config = {
                        data: new Uint8Array(reader.result),
                        headers: {
                            'Content-Type': fileInfo.type,
                            'Content-Length': fileInfo.fileSize,
                            'x-ms-blob-type': 'BlockBlob'
                        },
                        transformRequest: []
                    };
                    _this.http.put(_this.endpoints.image.PUT.uri, reader.target.result, config).success(function (r) { return _this.putFileSuccess(r); }).error(function (d, s) { return _this.createFilesError(d, s); });
                };
                fileReader.readAsArrayBuffer(fileInfo);
            };
            CreativeController.prototype.createFilesError = function (data, status) {
                this.alert.showAlert(publishr.client.ResponseHelpers.defaults[status]);
            };
            CreativeController.prototype.putFileSuccess = function (result) {
                this.scope.success = {
                    uri: this.endpoints.image.GET.uri
                };
            };
            CreativeController.prototype.putFileError = function (data, status) {
                this.alert.showAlert('Error uploading file');
            };
            CreativeController.$inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
            return CreativeController;
        })();
        var states = function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('creative', {
                url: '/creative',
                controller: 'Creative',
                templateUrl: 'Creative.html'
            });
            $urlRouterProvider.otherwise("/creative");
        };
        angular.module('creative', ['ui.router']).constant('api', sample.SampleApi).service('alert', sample.SampleAlert).controller('Creative', CreativeController).config(['$stateProvider', '$urlRouterProvider', states]);
    })(sample = publishr.sample || (publishr.sample = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=creative.js.map