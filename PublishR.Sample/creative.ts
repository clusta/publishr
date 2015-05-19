module publishr.sample {
    "use strict";

    class CreativeController {
        constructor(
            public scope: CreativeScope,
            public state: {},
            public location: publishr.client.ILocationService,
            public http: publishr.client.IHttpService,
            public api: publishr.client.IApi,
            public alert: publishr.client.IAlert) {

            this.scope.upload = () => this.createFiles();
        }       

        getFileUri(setname?: string): string {
            return publishr.client.UriHelpers.join(this.api.baseAddress, 'file', setname);
        }

        private win: any = window;

        getImageFile() {
            var fileInput = document.getElementsByName('image')[0];

            return fileInput['files'][0];
        }

        createFiles() {
            var supportsFileApi = this.win.File && this.win.FileReader && this.win.FileList;

            if (!supportsFileApi) {
                this.alert.showAlert('File API required');

                return;
            }

            var fileInfo = this.getImageFile();
            var file: publishr.client.File = {
                name: fileInfo.name,
                mimetype: fileInfo.type
            };
            
            var model = {
                'image': file
            };

            this.http
                .post<{}>(this.getFileUri('creative1'), model, this.api.config)
                .success(resource => this.createFilesSuccess(resource))
                .error((d, s) => this.createFilesError(d, s));
        }

        private endpoints: any;

        createFilesSuccess(endpoints: {}) {
            this.endpoints = endpoints;
            
            // PUT BLOB: https://msdn.microsoft.com/en-us/library/azure/dd179451.aspx
            // FileReader API: http://www.html5rocks.com/en/tutorials/file/dndfiles/

            var fileReader = new this.win.FileReader();
            var fileInfo = this.getImageFile();

            fileReader.onload = reader => {
                var config = {
                    data: new Uint8Array(reader.result),
                    headers: {
                        'Content-Type': fileInfo.type,
                        'Content-Length': fileInfo.fileSize,
                        'x-ms-blob-type': 'BlockBlob'
                    },
                    transformRequest: []
                };

                this.http
                    .put<{}>(this.endpoints.image.PUT.uri, reader.target.result, config)
                    .success(r => this.putFileSuccess(r))
                    .error((d, s) => this.createFilesError(d, s));
            };

            fileReader.readAsArrayBuffer(fileInfo);
        }

        createFilesError(data: any, status: number) {
            this.alert.showAlert(publishr.client.ResponseHelpers.defaults[status]);
        }

        putFileSuccess(result: {}) {
            this.scope.success = {
                uri: this.endpoints.image.GET.uri
            };
        }

        putFileError(data: any, status: number) {
            this.alert.showAlert('Error uploading file');
        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
    }

    interface CreativeScope {
        success: CreativeSuccessScope;
        upload(): void;
    }

    interface CreativeSuccessScope {
        uri: string;
    }

    var states = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state('creative', {
            url: '/creative',
            controller: 'Creative',
            templateUrl: 'Creative.html'
        });
        $urlRouterProvider.otherwise("/creative");
    };

    angular
        .module('creative', ['ui.router'])
        .constant('api', SampleApi)
        .service('alert', SampleAlert)
        .controller('Creative', CreativeController)
        .config(['$stateProvider', '$urlRouterProvider', states]);
} 