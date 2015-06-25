/// <reference path="basecontroller.ts" />

module publishr.client {
    "use strict";

    export class AuthController extends BaseController {
        constructor(
            public scope: AuthScope,
            public state: AuthState,
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
            this.scope.authorize = form => this.authorize(form);
        }

        /* initialize */

        initialize() {

        }

        /* get authorize uri */

        getAuthorizeUri(): string {
            return UriHelpers.join(this.baseAddress, 'auth');
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
                this.bearerToken = identity.token;
            }

            if (this.state.redirect) {
                this.window.location.href = this.state.redirect;
            }
        }

        authorizeError(data: any, status: number) {
            this.status(status);
        }

        static $inject = ["$scope", "$stateParams", "$window", "$location" , "$http", "$q"];
    }

    export interface AuthRequest {
        email: string;
        password: string;
    }

    export interface AuthScope extends ng.IScope {
        authorize(form?: ng.IFormController): void;
        data: AuthRequest;
    }

    export interface AuthState {
        redirect: string;
    }
} 