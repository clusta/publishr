module publishr.client {
    "use strict";

    export class CreativeController {
        constructor(
            public scope: CreativeScope,
            public state: CreativeState,
            public location: ng.ILocationService,
            public http: ng.IHttpService,
            public api: IApi,
            public alert: IAlert,
            public q: ng.IQService) {

            this.bind();
        }

        /* bind */

        bind() {
            this.scope.createFiles = () => this.createCreative();
        }

        /* get uris */

        getFileUri(): string {
            return publishr.client.UriHelpers.join(this.api.baseAddress, 'file', this.state.setname);
        }

        getCreativeUri(): string {
            return publishr.client.UriHelpers.join(this.api.baseAddress, 'creative');
        }

        /* get inputs */

        getFileInputs(): NodeList {
            return document.querySelectorAll('input[type=file]');
        }

        getFileSet() {
            var fileInputs = this.getFileInputs();
            var fileSet = {};

            for (var i = 0; i < fileInputs.length; ++i) {
                var fileInput = <HTMLInputElement>fileInputs[i];
                var fileInfo = fileInput.files[0];

                fileSet[fileInput.name] = {
                    name: fileInfo.name,
                    mimetype: fileInfo.type
                };
            }

            return fileSet;
        }

        /* create creative */

        buildCreative(fileSet: any): Creative {
            var creative: Creative = {
                title: null,
                description: null,
                media: [],
                properties: {}
            };

            for (var name in fileSet) {
                var file: publishr.client.File = fileSet[name];

                creative.media.push({
                    region: null,
                    caption: null,
                    credit: null,
                    sources: [
                        {
                            uri: file.uri,
                            mimetype: file.mimetype,
                            dimensions: null,
                            properties: {}
                        }
                    ],
                    properties: {}
                });
            }

            return creative;
        }

        createCreative(form?: ng.IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<{}>(this.getFileUri(), this.getFileSet(), this.api.config)
                .success(endpoints => this.createFilesSuccess(endpoints))
                .error((d, s) => this.createFilesError(d, s));
        }

        private win: any = window;
        private endpoints: any;

        createFilesSuccess(endpoints: {}) {
            this.endpoints = endpoints;

            var filePromises: Array<ng.IPromise<{}>> = [];
            var fileInputs = this.getFileInputs();
            var fileSet = this.getFileSet();

            for (var i = 0; i < fileInputs.length; ++i) {
                var fileInput = <HTMLInputElement>fileInputs[i];
                var fileInfo = fileInput.files[0];

                this.uploadFile(fileSet, fileInputs, fileInput, fileInfo, filePromises);
            }
        }

        uploadFile(fileSet: any, fileInputs: NodeList, fileInput: any, fileInfo: any, filePromises: Array<ng.IPromise<{}>>) {
            var fileReader = new this.win.FileReader();
            var name = fileInput.name;

            fileReader.onload = reader => {
                var endpoint = this.endpoints[name];

                var defaultHeaders = {
                    'Content-Type': fileInfo.type
                };

                var requestConfig = {
                    data: new Uint8Array(reader.result),
                    headers: ArrayHelpers.mergeLeft(defaultHeaders, endpoint.PUT.headers),
                    transformRequest: []
                };

                var httpPromise = this.http
                    .put<{}>(endpoint.PUT.uri, reader.target.result, requestConfig)
                    .error((d, s) => this.createFilesError(d, s));

                filePromises.push(httpPromise);
                fileSet[name].uri = endpoint.GET.uri;

                if (filePromises.length == fileInputs.length) {
                    this.q.all(filePromises)
                        .then(r => {
                        var model = {
                            kind: this.state.kind,
                            path: this.state.path,
                            content: this.buildCreative(fileSet)
                        };

                        this.http
                            .post<{}>(this.getCreativeUri(), model, this.api.config)
                            .success(r => this.createCreativeSuccess())
                            .error((d, s) => this.createFilesError(d, s));
                    });
                }
            };

            fileReader.readAsArrayBuffer(fileInfo);
        }

        createFilesError(data: any, status: number) {
            this.alert.showAlert(publishr.client.ResponseHelpers.defaults[status]);
        }

        createCreativeSuccess() {

        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert", "$q"];
    }

    export interface CreativeState {
        setname: string;
        kind: string;
        path: string;
    }

    export interface CreativeScope {
        create: any;
        createFiles(): void;
    }
} 