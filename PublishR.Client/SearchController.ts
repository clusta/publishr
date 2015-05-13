module publishr.client {
    "use strict";

    export class SearchController {
        constructor(
            public scope: SearchScope,
            public state: SearchState,
            public location: ILocationService,
            public http: IHttpService,
            public api: IApi,
            public alert: IAlert)
        {
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
            return UriHelpers.join(this.api.baseAddress, 'search', this.state.kind);
        }

        /* query */

        search(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<Result>(this.getSearchUri(), this.state, this.api.config)
                .success(p => this.searchSuccess(p))
                .error((d, s) => this.searchError(d, s)); 
        }   

        searchSuccess(result: Result) {
            this.scope.result = result;
        }

        searchError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
    }

    export interface SearchScope {
        result: Result;
        state: SearchState;
        search(form?: IFormController): void;
    }

    export interface SearchState {
        kind: string;
        state: string;
        tag: string;
    }
} 