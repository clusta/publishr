module publishr.client {
    "use strict";

    export class CreativeController extends BaseController {
        constructor(
            public scope: CreativeScope,
            public state: CreativeState,
            public window: ng.IWindowService,
            public location: ng.ILocationService,
            public http: ng.IHttpService,
            public q: ng.IQService)
        {
            super();

            this.bind();
        }

        /* bind */

        bind() {
            this.scope.createFiles = () => this.createCreative();
        }

        /* get uris */

        getFileUri(): string {
            return publishr.client.UriHelpers.join(this.baseAddress, 'file', this.state.setname);
        }

        getCreativeUri(): string {
            return publishr.client.UriHelpers.join(this.baseAddress, 'creative');
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
                blocks: {
                    content: {
                        text: null,
                        links: null,
                        inputs: null,
                        media: [],
                        properties: null
                    }
                },
                properties: {}
            };

            for (var name in fileSet) {
                var file: publishr.client.File = fileSet[name];

                creative.blocks['content'].media.push({
                    format: null,
                    region: null,
                    caption: null,
                    credit: null,
                    sources: [
                        {
                            uri: file.uri,
                            type: file.type,
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
                .post<{}>(this.getFileUri(), this.getFileSet(), this.buildRequestConfig())
                .success(endpoints => this.createFilesSuccess(endpoints))
                .error((d, s) => this.createFilesError(d, s));
        }

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
            var fileReader: any = new FileReader();
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
                            data: this.buildCreative(fileSet)
                        };

                        this.http
                            .post<{}>(this.getCreativeUri(), model, this.buildRequestConfig())
                            .success(r => this.createCreativeSuccess())
                            .error((d, s) => this.createFilesError(d, s));
                    });
                }
            };

            fileReader.readAsArrayBuffer(fileInfo);
        }

        createFilesError(data: any, status: number) {
            this.statusAlert(status);
        }

        createCreativeSuccess() {
            if (this.state.redirect) {
                this.window.location.href = this.state.redirect;
            }
        }

        static $inject = ["$scope", "$stateParams", "$window", "$location", "$http", "$q"];
    }

    export interface CreativeState {
        setname: string;
        kind: string;
        path: string;
        redirect: string;
    }

    export interface CreativeScope {
        create: any;
        createFiles(): void;
    }
} 