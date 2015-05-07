module publishr.client {
    "use strict";

    export class CollectionController {
        constructor(
            public scope: CollectionScope,
            public state: CollectionState,
            public location: ILocationService,
            public http: IHttpService,
            public api: IApi,
            public alert: IAlert)
        {
            this.initialize();
        }

        /* initialize */

        initialize() {

        }

        /* get collection uri */

        getCollectionUri(id?: string): string {
            return UriHelpers.join(this.api.baseAddress, 'collection', id);
        }

        /* get collection */

        getCollection() {
            this.http
                .get<Collection>(this.getCollectionUri(this.state.id), this.api.config)
                .success(r => this.getCollectionSuccess(r))
                .error((d, s) => this.getCollectionError(d, s)); 
        }   

        getCollectionSuccess(collection: Collection) {
            this.scope.data = collection;
        }

        getCollectionError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
    }

    export interface CollectionScope {
        data: Collection;
    }

    export interface CollectionState {
        id: string;
    }
} 