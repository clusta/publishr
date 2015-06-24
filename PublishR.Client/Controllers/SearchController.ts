module publishr.client {
    "use strict";

    export class SearchController extends BaseController {
        constructor(
            public scope: SearchScope,
            public state: SearchState,
            public window: ng.IWindowService,
            public location: ng.ILocationService,
            public http: ng.IHttpService,
            public q: ng.IQService)
        {
            super(window, q);

            this.bind();
            this.initialize();
        }
        
        /* bind */

        bind() {
            this.scope.search = form => this.search(form);
        }

        /* initialize */

        initialize() {
            this.scope.state = this.state;
        }

        /* get search uri */

        getSearchUri(): string {
            return UriHelpers.join(this.baseAddress, 'search', this.state.kind);
        }

        /* search */

        search(form?: ng.IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<Token>(this.getSearchUri(), this.state, this.buildRequestConfig())
                .success(p => this.searchSuccess(p))
                .error((d, s) => this.searchError(d, s)); 
        }   

        searchSuccess(result: Token) {
            this.scope.result = result;
        }

        searchError(data: any, status: number) {
            this.status(status);
        }

        static $inject = ["$scope", "$stateParams", "$window", "$location", "$http", "$q"];
    }

    export interface SearchScope extends ng.IScope {
        result: Token;
        state: SearchState;
        search(form?: ng.IFormController): void;
    }

    export interface SearchState {
        kind: string;
        state: string;
        tag: string;
    }
} 