module publishr.client {
    "use strict";

    export class AuthController {
        constructor(
            public scope: AuthScope,
            public state: AuthState,
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

        authorize(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<Identity>(this.getAuthorizeUri(), this.scope.data)
                .success(r => this.authorizeSuccess(r))
                .error((d, s) => this.authorizeError(d, s)); 
        }   

        authorizeSuccess(identity: Identity) {
            if (identity.accesstoken) {
                this.api.config = {
                    headers: {
                        Authorization: 'Bearer ' + identity.accesstoken
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
        authorize(form?: IFormController): void;
        data: AuthRequest;
    }

    export interface AuthState {
        redirect: string;
    }
} 