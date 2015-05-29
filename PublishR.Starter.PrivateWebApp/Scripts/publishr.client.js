var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var ResponseHelpers = (function () {
            function ResponseHelpers() {
            }
            ResponseHelpers.defaults = {
                "400": "Please re-check your input and re-send.",
                "403": "You do not have permission to complete the request.",
                "404": "Page could not be found. Please go back.",
                "409": "Input not saved as it is a duplicate.",
                "500": "There was a problem completing your request. Please try again."
            };
            return ResponseHelpers;
        })();
        client.ResponseHelpers = ResponseHelpers;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var AuthController = (function () {
            function AuthController(scope, state, location, http, api, alert) {
                this.scope = scope;
                this.state = state;
                this.location = location;
                this.http = http;
                this.api = api;
                this.alert = alert;
                this.bind();
                this.initialize();
            }
            AuthController.prototype.bind = function () {
                var _this = this;
                this.scope.authorize = function (form) { return _this.authorize(form); };
            };
            AuthController.prototype.initialize = function () {
            };
            AuthController.prototype.getAuthorizeUri = function () {
                return client.UriHelpers.join(this.api.baseAddress, 'auth');
            };
            AuthController.prototype.authorize = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.post(this.getAuthorizeUri(), this.scope.data).success(function (r) { return _this.authorizeSuccess(r); }).error(function (d, s) { return _this.authorizeError(d, s); });
            };
            AuthController.prototype.authorizeSuccess = function (identity) {
                if (identity.token) {
                    this.api.config = {
                        headers: {
                            Authorization: 'Bearer ' + identity.token
                        }
                    };
                }
                if (this.state.redirect) {
                    this.location.url(this.state.redirect);
                }
            };
            AuthController.prototype.authorizeError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            AuthController.$inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
            return AuthController;
        })();
        client.AuthController = AuthController;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var CommentController = (function () {
            function CommentController(scope, state, location, http, api, alert) {
                this.scope = scope;
                this.state = state;
                this.location = location;
                this.http = http;
                this.api = api;
                this.alert = alert;
                this.bind();
                this.initialize();
            }
            CommentController.prototype.bind = function () {
                var _this = this;
                this.scope.createComment = function (form) { return _this.createComment(form); };
            };
            CommentController.prototype.initialize = function () {
                this.scope.create = this.buildCreateCommentScope();
            };
            CommentController.prototype.getCommentUri = function () {
                return client.UriHelpers.join(this.api.baseAddress, 'comment') + '?path=' + this.state.path;
            };
            CommentController.prototype.list = function () {
                var _this = this;
                this.http.get(this.getCommentUri(), this.api.config).success(function (p) { return _this.listSuccess(p); }).error(function (d, s) { return _this.listError(d, s); });
            };
            CommentController.prototype.listSuccess = function (list) {
                this.scope.list = list;
            };
            CommentController.prototype.listError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            CommentController.prototype.buildCreateCommentScope = function (kind) {
                return {
                    kind: 'comment',
                    path: this.state.path,
                    data: {
                        author: null,
                        text: null,
                        properties: {}
                    }
                };
            };
            CommentController.prototype.createComment = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.post(this.getCommentUri(), this.scope.create, this.api.config).success(function (resource) { return _this.createCommentSuccess(resource); }).error(function (d, s) { return _this.createCommentError(d, s); });
            };
            CommentController.prototype.createCommentSuccess = function (resource) {
                this.scope.create = this.buildCreateCommentScope();
                this.list();
            };
            CommentController.prototype.createCommentError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            CommentController.$inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
            return CommentController;
        })();
        client.CommentController = CommentController;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var CreativeController = (function () {
            function CreativeController(scope, state, location, http, api, alert, q) {
                this.scope = scope;
                this.state = state;
                this.location = location;
                this.http = http;
                this.api = api;
                this.alert = alert;
                this.q = q;
                this.win = window;
                this.bind();
            }
            CreativeController.prototype.bind = function () {
                var _this = this;
                this.scope.createFiles = function () { return _this.createCreative(); };
            };
            CreativeController.prototype.getFileUri = function () {
                return publishr.client.UriHelpers.join(this.api.baseAddress, 'file', this.state.setname);
            };
            CreativeController.prototype.getCreativeUri = function () {
                return publishr.client.UriHelpers.join(this.api.baseAddress, 'creative');
            };
            CreativeController.prototype.getFileInputs = function () {
                return document.querySelectorAll('input[type=file]');
            };
            CreativeController.prototype.getFileSet = function () {
                var fileInputs = this.getFileInputs();
                var fileSet = {};
                for (var i = 0; i < fileInputs.length; ++i) {
                    var fileInput = fileInputs[i];
                    var fileInfo = fileInput.files[0];
                    fileSet[fileInput.name] = {
                        name: fileInfo.name,
                        mimetype: fileInfo.type
                    };
                }
                return fileSet;
            };
            CreativeController.prototype.buildCreative = function (fileSet) {
                var creative = {
                    title: null,
                    blocks: {
                        content: {
                            media: []
                        }
                    },
                    properties: {}
                };
                for (var name in fileSet) {
                    var file = fileSet[name];
                    creative.blocks['content'].media.push({
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
            };
            CreativeController.prototype.createCreative = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.post(this.getFileUri(), this.getFileSet(), this.api.config).success(function (endpoints) { return _this.createFilesSuccess(endpoints); }).error(function (d, s) { return _this.createFilesError(d, s); });
            };
            CreativeController.prototype.createFilesSuccess = function (endpoints) {
                this.endpoints = endpoints;
                var filePromises = [];
                var fileInputs = this.getFileInputs();
                var fileSet = this.getFileSet();
                for (var i = 0; i < fileInputs.length; ++i) {
                    var fileInput = fileInputs[i];
                    var fileInfo = fileInput.files[0];
                    this.uploadFile(fileSet, fileInputs, fileInput, fileInfo, filePromises);
                }
            };
            CreativeController.prototype.uploadFile = function (fileSet, fileInputs, fileInput, fileInfo, filePromises) {
                var _this = this;
                var fileReader = new this.win.FileReader();
                var name = fileInput.name;
                fileReader.onload = function (reader) {
                    var endpoint = _this.endpoints[name];
                    var defaultHeaders = {
                        'Content-Type': fileInfo.type
                    };
                    var requestConfig = {
                        data: new Uint8Array(reader.result),
                        headers: client.ArrayHelpers.mergeLeft(defaultHeaders, endpoint.PUT.headers),
                        transformRequest: []
                    };
                    var httpPromise = _this.http.put(endpoint.PUT.uri, reader.target.result, requestConfig).error(function (d, s) { return _this.createFilesError(d, s); });
                    filePromises.push(httpPromise);
                    fileSet[name].uri = endpoint.GET.uri;
                    if (filePromises.length == fileInputs.length) {
                        _this.q.all(filePromises).then(function (r) {
                            var model = {
                                kind: _this.state.kind,
                                path: _this.state.path,
                                data: _this.buildCreative(fileSet)
                            };
                            _this.http.post(_this.getCreativeUri(), model, _this.api.config).success(function (r) { return _this.createCreativeSuccess(); }).error(function (d, s) { return _this.createFilesError(d, s); });
                        });
                    }
                };
                fileReader.readAsArrayBuffer(fileInfo);
            };
            CreativeController.prototype.createFilesError = function (data, status) {
                this.alert.showAlert(publishr.client.ResponseHelpers.defaults[status]);
            };
            CreativeController.prototype.createCreativeSuccess = function () {
            };
            CreativeController.$inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert", "$q"];
            return CreativeController;
        })();
        client.CreativeController = CreativeController;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var InviteController = (function () {
            function InviteController(scope, state, location, http, api, alert) {
                this.scope = scope;
                this.state = state;
                this.location = location;
                this.http = http;
                this.api = api;
                this.alert = alert;
                this.bind();
                this.initialize();
            }
            InviteController.prototype.bind = function () {
                var _this = this;
                this.scope.invite = function (form) { return _this.invite(form); };
            };
            InviteController.prototype.initialize = function () {
                this.scope.create = this.buildCreateInviteScope();
                this.scope.state = this.state;
            };
            InviteController.prototype.getInviteUri = function () {
                return client.UriHelpers.join(this.api.baseAddress, 'invite');
            };
            InviteController.prototype.buildCreateInviteScope = function () {
                return {
                    email: null,
                    roles: [
                        'member'
                    ]
                };
            };
            InviteController.prototype.invite = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.post(this.getInviteUri(), this.scope.create, this.api.config).success(function (p) { return _this.inviteSuccess(p); }).error(function (d, s) { return _this.inviteError(d, s); });
            };
            InviteController.prototype.inviteSuccess = function (token) {
                this.scope.success = {
                    email: this.scope.create.email,
                    token: token
                };
                this.scope.create = this.buildCreateInviteScope();
            };
            InviteController.prototype.inviteError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            InviteController.$inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
            return InviteController;
        })();
        client.InviteController = InviteController;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var PageController = (function () {
            function PageController(scope, state, location, http, api, alert) {
                this.scope = scope;
                this.state = state;
                this.location = location;
                this.http = http;
                this.api = api;
                this.alert = alert;
                this.bind();
                this.initialize();
            }
            PageController.prototype.bind = function () {
                var _this = this;
                this.scope.createPage = function (form) { return _this.createPage(form); };
                this.scope.updatePage = function (form) { return _this.updatePage(form); };
                this.scope.submitPage = function () { return _this.submitPage(); };
                this.scope.approvePage = function () { return _this.approvePage(); };
                this.scope.rejectPage = function () { return _this.rejectPage(); };
                this.scope.deletePage = function () { return _this.deletePage(); };
                this.scope.addCard = function (name) { return _this.addCard(name); };
                this.scope.removeCard = function (name) { return _this.removeCard(name); };
                this.scope.addTag = function (tag) { return _this.addTag(tag); };
                this.scope.removeTag = function (tag) { return _this.removeTag(tag); };
                this.scope.moveSectionUp = function (region, section) { return _this.moveSectionUp(region, section); };
                this.scope.moveSectionDown = function (region, section) { return _this.moveSectionDown(region, section); };
                this.scope.addSection = function (region, index, template) { return _this.addSection(region, index, template); };
                this.scope.removeSection = function (region, index) { return _this.removeSection(region, index); };
                this.scope.moveLinkUp = function (container, link) { return _this.moveLinkUp(container, link); };
                this.scope.moveLinkDown = function (link, section) { return _this.moveLinkDown(link, section); };
                this.scope.addLink = function (section, index, type) { return _this.addLink(section, index, type); };
                this.scope.removeLink = function (container, index) { return _this.removeLink(container, index); };
                this.scope.moveInputUp = function (field, section) { return _this.moveInputUp(field, section); };
                this.scope.moveInputDown = function (field, section) { return _this.moveInputDown(field, section); };
                this.scope.addInput = function (section, index, type) { return _this.addInput(section, index, type); };
                this.scope.removeInput = function (index, section) { return _this.removeInput(index, section); };
                this.scope.moveMediaUp = function (media, section) { return _this.moveMediaUp(media, section); };
                this.scope.moveMediaDown = function (media, section) { return _this.moveMediaDown(media, section); };
                this.scope.addMedia = function (section, index, type) { return _this.addMedia(section, index, type); };
                this.scope.removeMedia = function (index, section) { return _this.removeMedia(index, section); };
                this.scope.moveCreditUp = function (credit) { return _this.moveCreditUp(credit); };
                this.scope.moveCreditDown = function (credit) { return _this.moveCreditDown(credit); };
            };
            PageController.prototype.initialize = function () {
                this.scope.create = this.buildCreatePageScope();
            };
            PageController.prototype.getPageUri = function (id, connection) {
                return client.UriHelpers.join(this.api.baseAddress, 'page', id, connection);
            };
            PageController.prototype.getPage = function () {
                var _this = this;
                this.http.get(this.getPageUri(this.state.id), this.api.config).success(function (p) { return _this.getPageSuccess(p); }).error(function (d, s) { return _this.getPageError(d, s); });
            };
            PageController.prototype.getPageSuccess = function (page) {
                this.scope.resource = page;
                if (!page.data.tags)
                    page.data.tags = [];
                if (!page.data.regions)
                    page.data.regions = [];
                if (!page.data.credits)
                    page.data.credits = [];
                if (!page.data.schedules)
                    page.data.schedules = [];
            };
            PageController.prototype.getPageError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            PageController.prototype.buildCreatePageScope = function (kind) {
                return {
                    kind: kind || 'web_page',
                    path: null,
                    data: {
                        tags: [],
                        cards: {
                            medium: this.buildCard()
                        },
                        regions: {
                            main: {
                                sections: [
                                    this.buildSection()
                                ],
                                properties: {}
                            }
                        },
                        results: {},
                        credits: [],
                        schedules: [],
                        properties: {}
                    }
                };
            };
            PageController.prototype.createPage = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.post(this.getPageUri(), this.scope.create, this.api.config).success(function (resource) { return _this.createPageSuccess(resource); }).error(function (d, s) { return _this.createPageError(d, s); });
            };
            PageController.prototype.createPageSuccess = function (resource) {
                this.state.id = resource.id;
                this.getPage();
            };
            PageController.prototype.createPageError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            PageController.prototype.updatePage = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.put(this.getPageUri(this.state.id), this.scope.resource.data, this.api.config).success(function () { return _this.updatePageSuccess(); }).error(function (d, s) { return _this.updatePageError(d, s); });
            };
            PageController.prototype.updatePageSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updatePageError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.buildCard = function (name) {
                return {
                    title: null,
                    description: null,
                    media: [
                        this.buildMedia()
                    ],
                    properties: {}
                };
            };
            PageController.prototype.addCard = function (name) {
                this.scope.resource.data.cards[name] = this.buildCard(name);
            };
            PageController.prototype.removeCard = function (name) {
                delete this.scope.resource.data.cards[name];
            };
            PageController.prototype.addTag = function (tag) {
                if (!tag)
                    return;
                if (tag.length < 1)
                    return;
                if (!this.scope.resource.data.tags)
                    this.scope.resource.data.tags = new Array();
                var index = this.scope.resource.data.tags.map(function (t) {
                    return t.toLowerCase();
                }).indexOf(tag.toLowerCase());
                if (index == -1) {
                    this.scope.resource.data.tags.push(tag);
                }
            };
            PageController.prototype.removeTag = function (tag) {
                if (!tag)
                    return;
                if (tag.length < 1)
                    return;
                if (!this.scope.resource.data.tags) {
                    this.scope.resource.data.tags = new Array();
                    return;
                }
                var index = 0;
                while (index > -1) {
                    var index = this.scope.resource.data.tags.map(function (t) {
                        return t.toLowerCase();
                    }).indexOf(tag.toLowerCase());
                    if (index > -1) {
                        this.scope.resource.data.tags.splice(index, 1);
                    }
                }
            };
            PageController.prototype.moveSectionUp = function (region, section) {
                client.ArrayHelpers.moveUp(region.sections, section);
            };
            PageController.prototype.moveSectionDown = function (region, section) {
                client.ArrayHelpers.moveDown(region.sections, section);
            };
            PageController.prototype.buildSection = function (template) {
                return {
                    template: template,
                    blocks: {
                        header: null,
                        content: null
                    },
                    results: {},
                    schedules: [],
                    properties: {}
                };
            };
            PageController.prototype.addSection = function (region, index, template) {
                client.ArrayHelpers.insert(region.sections, this.buildSection(template), index);
            };
            PageController.prototype.removeSection = function (region, index) {
                client.ArrayHelpers.remove(region.sections, index);
            };
            PageController.prototype.moveLinkUp = function (block, link) {
                client.ArrayHelpers.moveUp(block.links, link);
            };
            PageController.prototype.moveLinkDown = function (block, link) {
                client.ArrayHelpers.moveDown(block.links, link);
            };
            PageController.prototype.buildLink = function (rel) {
                return {
                    type: null,
                    rel: rel,
                    uri: null,
                    title: null,
                    properties: {}
                };
            };
            PageController.prototype.addLink = function (block, index, rel) {
                client.ArrayHelpers.insert(block.links, this.buildLink(rel), index);
            };
            PageController.prototype.removeLink = function (block, index) {
                client.ArrayHelpers.remove(block.links, index);
            };
            PageController.prototype.moveInputUp = function (block, input) {
                client.ArrayHelpers.moveUp(block.inputs, input);
            };
            PageController.prototype.moveInputDown = function (block, input) {
                client.ArrayHelpers.moveDown(block.inputs, input);
            };
            PageController.prototype.buildInput = function (type) {
                return {
                    type: type,
                    name: null,
                    label: null,
                    hint: null,
                    description: null,
                    pattern: null,
                    required: false,
                    range: null,
                    length: null,
                    value: null,
                    options: [],
                    properties: {}
                };
            };
            PageController.prototype.addInput = function (block, index, type) {
                client.ArrayHelpers.insert(block.inputs, this.buildInput(type), index);
            };
            PageController.prototype.removeInput = function (block, index) {
                client.ArrayHelpers.remove(block.inputs, index);
            };
            PageController.prototype.moveMediaUp = function (block, media) {
                client.ArrayHelpers.moveUp(block.media, media);
            };
            PageController.prototype.moveMediaDown = function (block, media) {
                client.ArrayHelpers.moveDown(block.media, media);
            };
            PageController.prototype.buildMedia = function (format) {
                return {
                    format: format,
                    region: null,
                    caption: null,
                    credit: null,
                    sources: [
                        {
                            uri: null,
                            dimensions: null,
                            type: null,
                            properties: {}
                        }
                    ],
                    properties: {}
                };
            };
            PageController.prototype.addMedia = function (block, index, format) {
                client.ArrayHelpers.insert(block.media, this.buildMedia(format), index);
            };
            PageController.prototype.removeMedia = function (block, index) {
                client.ArrayHelpers.remove(block.media, index);
            };
            PageController.prototype.moveCreditUp = function (credit) {
                client.ArrayHelpers.moveUp(this.scope.resource.data.credits, credit);
            };
            PageController.prototype.moveCreditDown = function (credit) {
                client.ArrayHelpers.moveDown(this.scope.resource.data.credits, credit);
            };
            PageController.prototype.buildCredit = function () {
                return {
                    name: null,
                    description: null,
                    uri: null,
                    images: [],
                    properties: null
                };
            };
            PageController.prototype.addCredit = function (index) {
                client.ArrayHelpers.insert(this.scope.resource.data.credits, this.buildCredit(), index);
            };
            PageController.prototype.removeCredit = function (index) {
                client.ArrayHelpers.remove(this.scope.resource.data.credits, index);
            };
            PageController.prototype.buildSchedule = function () {
                var schedule = new client.Schedule();
                schedule.start = new Date();
                schedule.end = new Date(schedule.start.getFullYear() + 10, schedule.start.getMonth(), schedule.start.getDate());
                return schedule;
            };
            PageController.prototype.addSchedule = function (index) {
                client.ArrayHelpers.insert(this.scope.resource.data.schedules, this.buildSchedule(), index);
            };
            PageController.prototype.removeSchedule = function (index) {
                client.ArrayHelpers.remove(this.scope.resource.data.schedules, index);
            };
            PageController.prototype.submitPage = function () {
                var _this = this;
                this.http.post(this.getPageUri(this.state.id, 'submit'), null, this.api.config).success(function () { return _this.submitPageSuccess(); }).error(function (d, s) { return _this.submitPageError(d, s); });
            };
            PageController.prototype.submitPageSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.submitPageError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.approvePage = function () {
                var _this = this;
                this.http.post(this.getPageUri(this.state.id, 'approve'), null, this.api.config).success(function () { return _this.approvePageSuccess(); }).error(function (d, s) { return _this.approvePageError(d, s); });
            };
            PageController.prototype.approvePageSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.approvePageError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.rejectPage = function () {
                var _this = this;
                this.http.post(this.getPageUri(this.state.id, 'reject'), null, this.api.config).success(function () { return _this.rejectPageSuccess(); }).error(function (d, s) { return _this.rejectPageError(d, s); });
            };
            PageController.prototype.rejectPageSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.rejectPageError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.deletePage = function () {
                var _this = this;
                this.http.delete(this.getPageUri(this.state.id), this.api.config).success(function () { return _this.deletePageSuccess(); }).error(function (d, s) { return _this.deletePageError(d, s); });
            };
            PageController.prototype.deletePageSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.deletePageError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.updateSuccess = function () {
            };
            PageController.prototype.updateError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            PageController.$inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
            return PageController;
        })();
        client.PageController = PageController;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var RegisterController = (function () {
            function RegisterController(scope, state, location, http, api, alert) {
                this.scope = scope;
                this.state = state;
                this.location = location;
                this.http = http;
                this.api = api;
                this.alert = alert;
                this.bind();
                this.initialize();
            }
            RegisterController.prototype.bind = function () {
                var _this = this;
                this.scope.register = function (form) { return _this.register(form); };
            };
            RegisterController.prototype.initialize = function () {
                this.scope.create = this.buildCreateRegistrationScope();
                this.scope.state = this.state;
            };
            RegisterController.prototype.getRegisterUri = function () {
                return client.UriHelpers.join(this.api.baseAddress, 'register', this.state.token);
            };
            RegisterController.prototype.buildCreateRegistrationScope = function () {
                return {
                    email: this.state.email,
                    password: null
                };
            };
            RegisterController.prototype.register = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.post(this.getRegisterUri(), this.scope.create, this.api.config).success(function (p) { return _this.registerSuccess(); }).error(function (d, s) { return _this.registerError(d, s); });
            };
            RegisterController.prototype.registerSuccess = function () {
            };
            RegisterController.prototype.registerError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            RegisterController.$inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
            return RegisterController;
        })();
        client.RegisterController = RegisterController;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var SearchController = (function () {
            function SearchController(scope, state, location, http, api, alert) {
                this.scope = scope;
                this.state = state;
                this.location = location;
                this.http = http;
                this.api = api;
                this.alert = alert;
                this.bind();
                this.initialize();
            }
            SearchController.prototype.bind = function () {
                var _this = this;
                this.scope.search = function (form) { return _this.search(form); };
            };
            SearchController.prototype.initialize = function () {
                this.scope.state = this.state;
            };
            SearchController.prototype.getSearchUri = function () {
                return client.UriHelpers.join(this.api.baseAddress, 'search', this.state.kind);
            };
            SearchController.prototype.search = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.post(this.getSearchUri(), this.state, this.api.config).success(function (p) { return _this.searchSuccess(p); }).error(function (d, s) { return _this.searchError(d, s); });
            };
            SearchController.prototype.searchSuccess = function (result) {
                this.scope.result = result;
            };
            SearchController.prototype.searchError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            SearchController.$inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
            return SearchController;
        })();
        client.SearchController = SearchController;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var ArrayHelpers = (function () {
            function ArrayHelpers() {
            }
            ArrayHelpers.moveUp = function (arry, value, by) {
                var index = arry.indexOf(value);
                var newPos = index - (by || 1);
                if (index === -1)
                    throw new Error('Element not found in array');
                if (newPos < 0)
                    newPos = 0;
                arry.splice(index, 1);
                arry.splice(newPos, 0, value);
            };
            ArrayHelpers.moveDown = function (arry, value, by) {
                var index = arry.indexOf(value);
                var newPos = index + (by || 1);
                if (index === -1)
                    throw new Error('Element not found in array');
                if (newPos >= arry.length)
                    newPos = arry.length;
                arry.splice(index, 1);
                arry.splice(newPos, 0, value);
            };
            ArrayHelpers.insert = function (arry, value, index) {
                if (typeof index !== "number" || index >= arry.length) {
                    arry.push(value);
                }
                else if (index <= 0) {
                    arry.unshift(value);
                }
                else {
                    arry.splice(index, 0, value);
                }
            };
            ArrayHelpers.remove = function (arry, index) {
                arry.splice(index, 1);
            };
            ArrayHelpers.mergeLeft = function (obj1, obj2) {
                for (var attrname in obj2) {
                    obj1[attrname] = obj2[attrname];
                }
                return obj1;
            };
            return ArrayHelpers;
        })();
        client.ArrayHelpers = ArrayHelpers;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var StringHelpers = (function () {
            function StringHelpers() {
            }
            StringHelpers.trimEnd = function (text, char) {
                if (text.substr(-char.length) == char) {
                    return text.substr(0, text.length - char.length);
                }
                return text;
            };
            return StringHelpers;
        })();
        client.StringHelpers = StringHelpers;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var UriHelpers = (function () {
            function UriHelpers() {
            }
            UriHelpers.join = function () {
                var segments = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    segments[_i - 0] = arguments[_i];
                }
                return segments.filter(Boolean).map(function (s) { return client.StringHelpers.trimEnd(s, '/'); }).join('/');
            };
            return UriHelpers;
        })();
        client.UriHelpers = UriHelpers;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Author = (function () {
            function Author() {
            }
            return Author;
        })();
        client.Author = Author;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Block = (function () {
            function Block() {
            }
            return Block;
        })();
        client.Block = Block;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Card = (function () {
            function Card() {
            }
            return Card;
        })();
        client.Card = Card;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Comment = (function () {
            function Comment() {
            }
            return Comment;
        })();
        client.Comment = Comment;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Continuation = (function () {
            function Continuation() {
            }
            return Continuation;
        })();
        client.Continuation = Continuation;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Creative = (function () {
            function Creative() {
            }
            return Creative;
        })();
        client.Creative = Creative;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Credit = (function () {
            function Credit() {
            }
            return Credit;
        })();
        client.Credit = Credit;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Dimensions = (function () {
            function Dimensions() {
            }
            return Dimensions;
        })();
        client.Dimensions = Dimensions;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Facet = (function () {
            function Facet() {
            }
            return Facet;
        })();
        client.Facet = Facet;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var File = (function () {
            function File() {
            }
            return File;
        })();
        client.File = File;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Identity = (function () {
            function Identity() {
            }
            return Identity;
        })();
        client.Identity = Identity;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Input = (function () {
            function Input() {
            }
            return Input;
        })();
        client.Input = Input;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Length = (function () {
            function Length() {
            }
            return Length;
        })();
        client.Length = Length;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Link = (function () {
            function Link() {
            }
            return Link;
        })();
        client.Link = Link;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Listing = (function () {
            function Listing() {
            }
            return Listing;
        })();
        client.Listing = Listing;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Media = (function () {
            function Media() {
            }
            return Media;
        })();
        client.Media = Media;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Meta = (function () {
            function Meta() {
            }
            return Meta;
        })();
        client.Meta = Meta;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Option = (function () {
            function Option() {
            }
            return Option;
        })();
        client.Option = Option;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Page = (function () {
            function Page() {
            }
            return Page;
        })();
        client.Page = Page;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Range = (function () {
            function Range() {
            }
            return Range;
        })();
        client.Range = Range;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Region = (function () {
            function Region() {
            }
            return Region;
        })();
        client.Region = Region;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Resource = (function () {
            function Resource() {
            }
            return Resource;
        })();
        client.Resource = Resource;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Result = (function () {
            function Result() {
            }
            return Result;
        })();
        client.Result = Result;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Schedule = (function () {
            function Schedule() {
            }
            return Schedule;
        })();
        client.Schedule = Schedule;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Section = (function () {
            function Section() {
            }
            return Section;
        })();
        client.Section = Section;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Source = (function () {
            function Source() {
            }
            return Source;
        })();
        client.Source = Source;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var Token = (function () {
            function Token() {
            }
            return Token;
        })();
        client.Token = Token;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
//# sourceMappingURL=publishr.client.js.map