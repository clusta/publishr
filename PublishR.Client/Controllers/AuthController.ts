module publishr.client {
    "use strict";

    export class AuthController {
        constructor(
            public scope: AuthScope,
            public state: AuthState,
            public location: ng.ILocationService,
            public http: ng.IHttpService,
            public api: IApi,
            public alert: IAlert)
        {
            this.bind();
            this.initialize();
        }

        /* bind */

        bind() {
            this.scope.authorize = form => this.authorize(form);
        }

        /* initialize */

        initialize() {

        }

        /* get authorize uri */

        getAuthorizeUri(): string {
            return UriHelpers.join(this.api.baseAddress, 'auth');
        }

        /* authorize */

        authorize(form?: ng.IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<Identity>(this.getAuthorizeUri(), this.scope.data)
                .success(r => this.authorizeSuccess(r))
                .error((d, s) => this.authorizeError(d, s)); 
        }   

        authorizeSuccess(identity: Identity) {
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
        }

        authorizeError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
    }

    export interface AuthRequest {
        email: string;
        password: string;
    }

    export interface AuthScope {
        authorize(form?: ng.IFormController): void;
        data: AuthRequest;
    }

    export interface AuthState {
        redirect: string;
    }
} 