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
                return client.StringHelpers.trimEnd(this.api.baseAddress, '/') + '/auth';
            };
            AuthController.prototype.authorize = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.post(this.getAuthorizeUri(), this.scope.data).success(function (r) { return _this.authorizeSuccess(r); }).error(function (d, s) { return _this.authorizeError(d, s); });
            };
            AuthController.prototype.authorizeSuccess = function (identity) {
                if (identity.access_token) {
                    this.api.config = {
                        headers: {
                            Authorization: 'Bearer ' + identity.access_token
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
        var Collection = (function () {
            function Collection() {
            }
            return Collection;
        })();
        client.Collection = Collection;
    })(client = publishr.client || (publishr.client = {}));
})(publishr || (publishr = {}));
var publishr;
(function (publishr) {
    var client;
    (function (client) {
        "use strict";
        var CollectionController = (function () {
            function CollectionController(scope, state, location, http, api, alert) {
                this.scope = scope;
                this.state = state;
                this.location = location;
                this.http = http;
                this.api = api;
                this.alert = alert;
                this.initialize();
            }
            CollectionController.prototype.initialize = function () {
            };
            CollectionController.prototype.getCollectionUri = function () {
                return client.StringHelpers.trimEnd(this.api.baseAddress, '/') + '/collection/' + this.state.id;
            };
            CollectionController.prototype.getCollection = function () {
                var _this = this;
                this.http.get(this.getCollectionUri(), this.api.config).success(function (r) { return _this.getCollectionSuccess(r); }).error(function (d, s) { return _this.getCollectionError(d, s); });
            };
            CollectionController.prototype.getCollectionSuccess = function (collection) {
                this.scope.data = collection;
            };
            CollectionController.prototype.getCollectionError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            CollectionController.$inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
            return CollectionController;
        })();
        client.CollectionController = CollectionController;
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
                this.scope.create = {
                    uri: this.state.id,
                    text: {
                        format: null,
                        content: null
                    }
                };
            };
            CommentController.prototype.getCommentsUri = function () {
                return client.StringHelpers.trimEnd(this.api.baseAddress, '/') + '/comment/';
            };
            CommentController.prototype.getComments = function () {
                var _this = this;
                this.http.get(this.getCommentsUri() + '?uri=' + this.state.id, this.api.config).success(function (p) { return _this.getCommentsSuccess(p); }).error(function (d, s) { return _this.getCommentsError(d, s); });
            };
            CommentController.prototype.getCommentsSuccess = function (comments) {
                this.scope.data = comments;
            };
            CommentController.prototype.getCommentsError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            CommentController.prototype.createComment = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.post(this.getCommentsUri(), this.scope.create, this.api.config).success(function (resource) { return _this.createCommentSuccess(resource); }).error(function (d, s) { return _this.createCommentError(d, s); });
            };
            CommentController.prototype.createCommentSuccess = function (resource) {
                this.initialize();
                this.getComments();
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
        var Field = (function () {
            function Field() {
            }
            return Field;
        })();
        client.Field = Field;
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
        var Metadata = (function () {
            function Metadata() {
            }
            return Metadata;
        })();
        client.Metadata = Metadata;
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
                this.scope.addCard = function (name) { return _this.addCard(name); };
                this.scope.removeCard = function (name) { return _this.removeCard(name); };
                this.scope.updateCards = function (form) { return _this.updateCards(form); };
                this.scope.updateProperties = function (form) { return _this.updateProperties(form); };
                this.scope.addTag = function (tag) { return _this.addTag(tag); };
                this.scope.removeTag = function (tag) { return _this.removeTag(tag); };
                this.scope.updateTags = function (form) { return _this.updateTags(form); };
                this.scope.updateMetadata = function (form) { return _this.updateMetadata(form); };
                this.scope.moveSectionUp = function (section) { return _this.moveSectionUp(section); };
                this.scope.moveSectionDown = function (section) { return _this.moveSectionDown(section); };
                this.scope.addSection = function (index, layout) { return _this.addSection(index, layout); };
                this.scope.removeSection = function (index) { return _this.removeSection(index); };
                this.scope.updateSections = function (form) { return _this.updateSections(form); };
                this.scope.moveLinkUp = function (link, section) { return _this.moveLinkUp(link, section); };
                this.scope.moveLinkDown = function (link, section) { return _this.moveLinkDown(link, section); };
                this.scope.addLink = function (section, index, content_type) { return _this.addLink(section, index, content_type); };
                this.scope.removeLink = function (index, section) { return _this.removeLink(index, section); };
                this.scope.moveFieldUp = function (field, section) { return _this.moveFieldUp(field, section); };
                this.scope.moveFieldDown = function (field, section) { return _this.moveFieldDown(field, section); };
                this.scope.addField = function (section, index, input_type) { return _this.addField(section, index, input_type); };
                this.scope.removeField = function (index, section) { return _this.removeField(index, section); };
                this.scope.moveMediaUp = function (media, section) { return _this.moveMediaUp(media, section); };
                this.scope.moveMediaDown = function (media, section) { return _this.moveMediaDown(media, section); };
                this.scope.addMedia = function (section, index, content_type) { return _this.addMedia(section, index, content_type); };
                this.scope.removeMedia = function (index, section) { return _this.removeMedia(index, section); };
                this.scope.moveCreditUp = function (credit) { return _this.moveCreditUp(credit); };
                this.scope.moveCreditDown = function (credit) { return _this.moveCreditDown(credit); };
                this.scope.updateCredits = function (form) { return _this.updateCredits(form); };
                this.scope.updateSchedules = function (form) { return _this.updateSchedules(form); };
                this.scope.submitPage = function () { return _this.submitPage(); };
                this.scope.approvePage = function () { return _this.approvePage(); };
                this.scope.rejectPage = function () { return _this.rejectPage(); };
                this.scope.deletePage = function () { return _this.deletePage(); };
            };
            PageController.prototype.initialize = function () {
                this.scope.create = {
                    kind: 'web_page',
                    slug: null,
                    card: null
                };
            };
            PageController.prototype.getPageUri = function () {
                return client.StringHelpers.trimEnd(this.api.baseAddress, '/') + '/page/' + (this.state.id || '');
            };
            PageController.prototype.getPage = function () {
                var _this = this;
                this.http.get(this.getPageUri(), this.api.config).success(function (p) { return _this.getPageSuccess(p); }).error(function (d, s) { return _this.getPageError(d, s); });
            };
            PageController.prototype.getPageSuccess = function (page) {
                this.scope.data = page;
                if (!page.sections)
                    page.sections = [];
                if (!page.credits)
                    page.credits = [];
                if (!page.schedules)
                    page.schedules = [];
            };
            PageController.prototype.getPageError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            PageController.prototype.createPage = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.state.id = null;
                this.http.post(this.getPageUri(), this.scope.create, this.api.config).success(function (resource) { return _this.createPageSuccess(resource); }).error(function (d, s) { return _this.createPageError(d, s); });
            };
            PageController.prototype.createPageSuccess = function (resource) {
                this.state.id = resource.id;
                this.getPage();
            };
            PageController.prototype.createPageError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            PageController.prototype.createCard = function (name) {
                return new client.Card();
            };
            PageController.prototype.addCard = function (name) {
                this.scope.data.cards[name] = this.createCard(name);
            };
            PageController.prototype.removeCard = function (name) {
                delete this.scope.data.cards[name];
            };
            PageController.prototype.updateCards = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.put(this.getPageUri() + '/cards', this.scope.data.cards, this.api.config).success(function () { return _this.updateCardsSuccess(); }).error(function (d, s) { return _this.updateCardsError(d, s); });
            };
            PageController.prototype.updateCardsSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updateCardsError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.updateProperties = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.put(this.getPageUri() + '/properties', this.scope.data.properties, this.api.config).success(function () { return _this.updateSectionsSuccess(); }).error(function (d, s) { return _this.updatePropertiesError(d, s); });
            };
            PageController.prototype.updatePropertiesSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updatePropertiesError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.addTag = function (tag) {
                if (!tag)
                    return;
                if (tag.length < 1)
                    return;
                if (!this.scope.data.tags)
                    this.scope.data.tags = new Array();
                var index = this.scope.data.tags.map(function (t) {
                    return t.toLowerCase();
                }).indexOf(tag.toLowerCase());
                if (index == -1) {
                    this.scope.data.tags.push(tag);
                }
            };
            PageController.prototype.removeTag = function (tag) {
                if (!tag)
                    return;
                if (tag.length < 1)
                    return;
                if (!this.scope.data.tags) {
                    this.scope.data.tags = new Array();
                    return;
                }
                var index = 0;
                while (index > -1) {
                    var index = this.scope.data.tags.map(function (t) {
                        return t.toLowerCase();
                    }).indexOf(tag.toLowerCase());
                    if (index > -1) {
                        this.scope.data.tags.splice(index, 1);
                    }
                }
            };
            PageController.prototype.updateTags = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.put(this.getPageUri() + '/tags', this.scope.data.tags, this.api.config).success(function () { return _this.updateTagsSuccess(); }).error(function (d, s) { return _this.updateTagssError(d, s); });
            };
            PageController.prototype.updateTagsSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updateTagssError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.updateMetadata = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.put(this.getPageUri() + '/metadata', this.scope.data.metadata, this.api.config).success(function () { return _this.updateMetadataSuccess(); }).error(function (d, s) { return _this.updateMetadataError(d, s); });
            };
            PageController.prototype.updateMetadataSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updateMetadataError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.moveSectionUp = function (section) {
                client.ArrayHelpers.moveUp(this.scope.data.sections, section);
            };
            PageController.prototype.moveSectionDown = function (section) {
                client.ArrayHelpers.moveDown(this.scope.data.sections, section);
            };
            PageController.prototype.createSection = function (layout) {
                return {
                    layout: layout,
                    region: null,
                    blocks: [],
                    links: [],
                    fields: [],
                    media: [],
                    schedules: [],
                    properties: null
                };
            };
            PageController.prototype.addSection = function (index, layout) {
                client.ArrayHelpers.insert(this.scope.data.sections, this.createSection(layout), index);
            };
            PageController.prototype.removeSection = function (index) {
                client.ArrayHelpers.remove(this.scope.data.sections, index);
            };
            PageController.prototype.updateSections = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.put(this.getPageUri() + '/sections', this.scope.data.sections, this.api.config).success(function () { return _this.updateSectionsSuccess(); }).error(function (d, s) { return _this.updateSectionsError(d, s); });
            };
            PageController.prototype.updateSectionsSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updateSectionsError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.createBlock = function (name) {
                return new client.Block();
            };
            PageController.prototype.addBlock = function (name, section) {
                section.blocks[name] = this.createBlock(name);
            };
            PageController.prototype.removeBlock = function (name, section) {
                delete section.blocks[name];
            };
            PageController.prototype.moveLinkUp = function (link, section) {
                client.ArrayHelpers.moveUp(section.links, link);
            };
            PageController.prototype.moveLinkDown = function (link, section) {
                client.ArrayHelpers.moveDown(section.links, link);
            };
            PageController.prototype.createLink = function (content_type) {
                var link = new client.Link();
                link.content_type = content_type;
                return link;
            };
            PageController.prototype.addLink = function (section, index, content_type) {
                client.ArrayHelpers.insert(section.links, this.createLink(content_type), index);
            };
            PageController.prototype.removeLink = function (index, section) {
                client.ArrayHelpers.remove(section.links, index);
            };
            PageController.prototype.moveFieldUp = function (field, section) {
                client.ArrayHelpers.moveUp(section.fields, field);
            };
            PageController.prototype.moveFieldDown = function (field, section) {
                client.ArrayHelpers.moveDown(section.fields, field);
            };
            PageController.prototype.createField = function (input_type) {
                var field = new client.Field();
                field.input_type = input_type;
                return field;
            };
            PageController.prototype.addField = function (section, index, field_type) {
                client.ArrayHelpers.insert(section.fields, this.createField(field_type), index);
            };
            PageController.prototype.removeField = function (index, section) {
                client.ArrayHelpers.remove(section.fields, index);
            };
            PageController.prototype.moveMediaUp = function (media, section) {
                client.ArrayHelpers.moveUp(section.media, media);
            };
            PageController.prototype.moveMediaDown = function (media, section) {
                client.ArrayHelpers.moveDown(section.media, media);
            };
            PageController.prototype.createMedia = function (content_type) {
                var media = new client.Media();
                var source = new client.Source();
                source.content_type = content_type;
                media.sources = [
                    source
                ];
                return media;
            };
            PageController.prototype.addMedia = function (section, index, content_type) {
                client.ArrayHelpers.insert(section.media, this.createMedia(content_type), index);
            };
            PageController.prototype.removeMedia = function (index, section) {
                client.ArrayHelpers.remove(section.media, index);
            };
            PageController.prototype.moveCreditUp = function (credit) {
                client.ArrayHelpers.moveUp(this.scope.data.credits, credit);
            };
            PageController.prototype.moveCreditDown = function (credit) {
                client.ArrayHelpers.moveDown(this.scope.data.credits, credit);
            };
            PageController.prototype.createCredit = function () {
                return new client.Credit();
            };
            PageController.prototype.addCredit = function (index) {
                client.ArrayHelpers.insert(this.scope.data.credits, this.createCredit(), index);
            };
            PageController.prototype.removeCredit = function (index) {
                client.ArrayHelpers.remove(this.scope.data.credits, index);
            };
            PageController.prototype.updateCredits = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.put(this.getPageUri() + '/credits', this.scope.data.credits, this.api.config).success(function () { return _this.updateCreditsSuccess(); }).error(function (d, s) { return _this.updateCreditsError(d, s); });
            };
            PageController.prototype.updateCreditsSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updateCreditsError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.createSchedule = function () {
                var schedule = new client.Schedule();
                schedule.start = new Date();
                schedule.end = new Date(schedule.start.getFullYear() + 10, schedule.start.getMonth(), schedule.start.getDate());
                return schedule;
            };
            PageController.prototype.addSchedule = function (index) {
                client.ArrayHelpers.insert(this.scope.data.schedules, this.createSchedule(), index);
            };
            PageController.prototype.removeSchedule = function (index) {
                client.ArrayHelpers.remove(this.scope.data.schedules, index);
            };
            PageController.prototype.updateSchedules = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.put(this.getPageUri() + '/schedules', this.scope.data.schedules, this.api.config).success(function () { return _this.updateSchedulesSuccess(); }).error(function (d, s) { return _this.updateSchedulesError(d, s); });
            };
            PageController.prototype.updateSchedulesSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updateSchedulesError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.submitPage = function () {
                var _this = this;
                this.http.post(this.getPageUri() + '/submit', null, this.api.config).success(function () { return _this.submitPageSuccess(); }).error(function (d, s) { return _this.submitPageError(d, s); });
            };
            PageController.prototype.submitPageSuccess = function () {
                this.stateSuccess();
            };
            PageController.prototype.submitPageError = function (data, status) {
                this.stateError(data, status);
            };
            PageController.prototype.approvePage = function () {
                var _this = this;
                this.http.post(this.getPageUri() + '/approve', null, this.api.config).success(function () { return _this.approvePageSuccess(); }).error(function (d, s) { return _this.approvePageError(d, s); });
            };
            PageController.prototype.approvePageSuccess = function () {
                this.stateSuccess();
            };
            PageController.prototype.approvePageError = function (data, status) {
                this.stateError(data, status);
            };
            PageController.prototype.rejectPage = function () {
                var _this = this;
                this.http.post(this.getPageUri() + '/reject', null, this.api.config).success(function () { return _this.rejectPageSuccess(); }).error(function (d, s) { return _this.rejectPageError(d, s); });
            };
            PageController.prototype.rejectPageSuccess = function () {
                this.stateSuccess();
            };
            PageController.prototype.rejectPageError = function (data, status) {
                this.stateError(data, status);
            };
            PageController.prototype.deletePage = function () {
                var _this = this;
                this.http.delete(this.getPageUri(), this.api.config).success(function () { return _this.deletePageSuccess(); }).error(function (d, s) { return _this.deletePageError(d, s); });
            };
            PageController.prototype.deletePageSuccess = function () {
                this.stateSuccess();
            };
            PageController.prototype.deletePageError = function (data, status) {
                this.stateError(data, status);
            };
            PageController.prototype.updateSuccess = function () {
            };
            PageController.prototype.updateError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            PageController.prototype.stateSuccess = function () {
            };
            PageController.prototype.stateError = function (data, status) {
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
                this.scope.query = function (form) { return _this.query(form); };
            };
            SearchController.prototype.initialize = function () {
                this.scope.parameters = {
                    kind: this.state.kind
                };
            };
            SearchController.prototype.getSearchUri = function () {
                return client.StringHelpers.trimEnd(this.api.baseAddress, '/') + '/search/';
            };
            SearchController.prototype.query = function (form) {
                var _this = this;
                if (form && form.$invalid)
                    return;
                this.http.post(this.getSearchUri(), this.scope.parameters, this.api.config).success(function (p) { return _this.querySuccess(p); }).error(function (d, s) { return _this.queryError(d, s); });
            };
            SearchController.prototype.querySuccess = function (collection) {
                this.scope.data = collection;
            };
            SearchController.prototype.queryError = function (data, status) {
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
//# sourceMappingURL=publishr.client.js.map