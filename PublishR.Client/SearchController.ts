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
            this.scope.query = form => this.query(form);
        }

        /* initialize */

        initialize() {
            this.scope.parameters = {
                kind: this.state.kind
            };
        }

        /* get search uri */

        getSearchUri(): string {
            return UriHelpers.join(this.api.baseAddress, 'search');
        }

        /* query */

        query(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<Collection>(this.getSearchUri(), this.scope.parameters, this.api.config)
                .success(p => this.querySuccess(p))
                .error((d, s) => this.queryError(d, s)); 
        }   

        querySuccess(collection: Collection) {
            this.scope.data = collection;
        }

        queryError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
    }

    export interface SearchScope {
        data: Collection;
        parameters: any;
        query(form?: IFormController): void;
    }

    export interface SearchState {
        kind: string;
    }
} 