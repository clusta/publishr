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
            return StringHelpers.trimEnd(this.api.baseAddress, '/')
                + '/auth';
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
            if (identity.access_token) {
                this.api.config = {
                    headers: {
                        Authorization: 'Bearer ' + identity.access_token
                    }
                };
            }

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
        authorize(form?: IFormController): void;
        data: AuthRequest;
    }

    export interface AuthState {
        redirect: string;
    }
} 