module publishr.client {
    "use strict";

    export class AuthController {
        constructor(
            public scope: AuthScope,
            public state: AuthState,
            public http: IHttpService,
            public api: IApi,
            public alert: IAlert,
            public location: ILocationService)
        {
            this.baseAddress = StringHelpers.trimEnd(this.api.baseAddress, '/')
                + '/auth';
        }

        private baseAddress: string;
        
        /* authorize */

        authorize() {
            this.http
                .post<Identity>(this.baseAddress,  this.scope.data)
                .success(r => this.authorizeSuccess(r))
                .error((d, s) => this.authorizeError(d, s)); 
        }   

        authorizeSuccess(identity: Identity) {
            this.location.url(this.state.redirect);
        }

        authorizeError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$http", "api", "alert", "$location"];
    }

    export interface AuthRequest {
        email: string;
        password: string;
    }

    export interface AuthScope {
        data: AuthRequest;
    }

    export interface AuthState {
        redirect: string;
    }
} 