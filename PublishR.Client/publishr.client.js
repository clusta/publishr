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
                if (newPos >= this.length)
                    newPos = this.length;
                arry.splice(index, 1);
                arry.splice(newPos, 0, value);
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
        var CollectionController = (function () {
            function CollectionController(scope, state, http, api, alert) {
                this.scope = scope;
                this.state = state;
                this.http = http;
                this.api = api;
                this.alert = alert;
                this.baseAddress = client.StringHelpers.trimEnd(this.api.baseAddress, '/') + '/collection/' + this.state.id;
            }
            CollectionController.prototype.getCollection = function () {
                var _this = this;
                this.http.get(this.baseAddress).success(function (r) { return _this.getCollectionSuccess(r); }).error(function (d, s) { return _this.getCollectionError(d, s); });
            };
            CollectionController.prototype.getCollectionSuccess = function (collection) {
                this.scope.data = collection;
            };
            CollectionController.prototype.getCollectionError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            CollectionController.$inject = ["$scope", "$stateParams", "$http", "api", "alert"];
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
        var CommentController = (function () {
            function CommentController(scope, state, http, api, alert) {
                this.scope = scope;
                this.state = state;
                this.http = http;
                this.api = api;
                this.alert = alert;
                this.baseAddress = client.StringHelpers.trimEnd(this.api.baseAddress, '/') + '/comment/' + this.state.id;
            }
            CommentController.prototype.getComments = function () {
                var _this = this;
                this.http.get(this.baseAddress).success(function (p) { return _this.getCommentsSuccess(p); }).error(function (d, s) { return _this.getCommentsError(d, s); });
            };
            CommentController.prototype.getCommentsSuccess = function (comments) {
                this.scope.data = comments;
            };
            CommentController.prototype.getCommentsError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            CommentController.$inject = ["$scope", "$stateParams", "$http", "api", "alert"];
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
        var CardSet = (function () {
            function CardSet() {
            }
            return CardSet;
        })();
        client.CardSet = CardSet;
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
        var PageController = (function () {
            function PageController(scope, state, http, api, alert) {
                this.scope = scope;
                this.state = state;
                this.http = http;
                this.api = api;
                this.alert = alert;
                this.baseAddress = client.StringHelpers.trimEnd(this.api.baseAddress, '/') + '/page/' + this.state.id;
            }
            PageController.prototype.getPage = function () {
                var _this = this;
                this.http.get(this.baseAddress).success(function (p) { return _this.getPageSuccess(p); }).error(function (d, s) { return _this.getPageError(d, s); });
            };
            PageController.prototype.getPageSuccess = function (page) {
                this.scope.data = page;
            };
            PageController.prototype.getPageError = function (data, status) {
                this.alert.showAlert(client.ResponseHelpers.defaults[status]);
            };
            PageController.prototype.updateCover = function () {
                var _this = this;
                this.http.put(this.baseAddress + '/cover', this.scope.data.cover).success(function () { return _this.updateSectionsSuccess(); }).error(function (d, s) { return _this.updateCoverError(d, s); });
            };
            PageController.prototype.updateCoverSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updateCoverError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.updateProperties = function () {
                var _this = this;
                this.http.put(this.baseAddress + '/properties', this.scope.data.properties).success(function () { return _this.updateSectionsSuccess(); }).error(function (d, s) { return _this.updatePropertiesError(d, s); });
            };
            PageController.prototype.updatePropertiesSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updatePropertiesError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.updateTags = function () {
                var _this = this;
                this.http.put(this.baseAddress + '/tags', this.scope.data.tags).success(function () { return _this.updateTagsSuccess(); }).error(function (d, s) { return _this.updateTagssError(d, s); });
            };
            PageController.prototype.updateTagsSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updateTagssError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.updateMetadata = function () {
                var _this = this;
                this.http.put(this.baseAddress + '/metadata', this.scope.data.metadata).success(function () { return _this.updateMetadataSuccess(); }).error(function (d, s) { return _this.updateMetadataError(d, s); });
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
            PageController.prototype.updateSections = function () {
                var _this = this;
                this.http.put(this.baseAddress + '/sections', this.scope.data.sections).success(function () { return _this.updateSectionsSuccess(); }).error(function (d, s) { return _this.updateSectionsError(d, s); });
            };
            PageController.prototype.updateSectionsSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updateSectionsError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.moveCreditUp = function (credit) {
                client.ArrayHelpers.moveUp(this.scope.data.credits, credit);
            };
            PageController.prototype.moveCreditDown = function (credit) {
                client.ArrayHelpers.moveDown(this.scope.data.credits, credit);
            };
            PageController.prototype.updateCredits = function () {
                var _this = this;
                this.http.put(this.baseAddress + '/credits', this.scope.data.credits).success(function () { return _this.updateCreditsSuccess(); }).error(function (d, s) { return _this.updateCreditsError(d, s); });
            };
            PageController.prototype.updateCreditsSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updateCreditsError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.updateCards = function () {
                var _this = this;
                this.http.put(this.baseAddress + '/cards', this.scope.data.cards).success(function () { return _this.updateCardsSuccess(); }).error(function (d, s) { return _this.updateCardsError(d, s); });
            };
            PageController.prototype.updateCardsSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updateCardsError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.updateSchedule = function () {
                var _this = this;
                this.http.put(this.baseAddress + '/schedule', this.scope.data.schedule).success(function () { return _this.updateScheduleSuccess(); }).error(function (d, s) { return _this.updateScheduleError(d, s); });
            };
            PageController.prototype.updateScheduleSuccess = function () {
                this.updateSuccess();
            };
            PageController.prototype.updateScheduleError = function (data, status) {
                this.updateError(data, status);
            };
            PageController.prototype.submitPage = function () {
                var _this = this;
                this.http.post(this.baseAddress + '/submit', null).success(function () { return _this.submitPageSuccess(); }).error(function (d, s) { return _this.submitPageError(d, s); });
            };
            PageController.prototype.submitPageSuccess = function () {
                this.stateSuccess();
            };
            PageController.prototype.submitPageError = function (data, status) {
                this.stateError(data, status);
            };
            PageController.prototype.approvePage = function () {
                var _this = this;
                this.http.post(this.baseAddress + '/approve', null).success(function () { return _this.approvePageSuccess(); }).error(function (d, s) { return _this.approvePageError(d, s); });
            };
            PageController.prototype.approvePageSuccess = function () {
                this.stateSuccess();
            };
            PageController.prototype.approvePageError = function (data, status) {
                this.stateError(data, status);
            };
            PageController.prototype.rejectPage = function () {
                var _this = this;
                this.http.post(this.baseAddress + '/reject', null).success(function () { return _this.rejectPageSuccess(); }).error(function (d, s) { return _this.rejectPageError(d, s); });
            };
            PageController.prototype.rejectPageSuccess = function () {
                this.stateSuccess();
            };
            PageController.prototype.rejectPageError = function (data, status) {
                this.stateError(data, status);
            };
            PageController.prototype.deletePage = function () {
                var _this = this;
                this.http.delete(this.baseAddress, null).success(function () { return _this.deletePageSuccess(); }).error(function (d, s) { return _this.deletePageError(d, s); });
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
            PageController.$inject = ["$scope", "$stateParams", "$http", "api", "alert"];
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
        var Cover = (function () {
            function Cover() {
            }
            return Cover;
        })();
        client.Cover = Cover;
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
//# sourceMappingURL=publishr.client.js.map