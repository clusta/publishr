module publishr.client {
    "use strict";

    export class CollectionController {
        constructor(
            public scope: CollectionScope,
            public state: CollectionState,
            public http: IHttpService,
            public api: IApi,
            public alert: IAlert)
        {
            this.baseAddress = StringHelpers.trimEnd(this.api.baseAddress, '/')
                + '/collection/'
                + this.state.id;
        }

        private baseAddress: string;
        
        /* get collection */

        getCollection() {
            this.http
                .get<Collection>(this.baseAddress, this.api.config)
                .success(r => this.getCollectionSuccess(r))
                .error((d, s) => this.getCollectionError(d, s)); 
        }   

        getCollectionSuccess(collection: Collection) {
            this.scope.data = collection;
        }

        getCollectionError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$http", "api", "alert"];
    }

    export interface CollectionScope {
        data: Collection;
    }

    export interface CollectionState {
        id: string;
    }
} 