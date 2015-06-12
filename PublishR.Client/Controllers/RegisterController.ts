﻿module publishr.client {
    "use strict";

    export class RegisterController extends BaseController {
        constructor(
            public scope: RegisterScope,
            public state: RegisterState,
            public location: ng.ILocationService,
            public http: ng.IHttpService,
            public q: ng.IQService)
        {
            super();

            this.bind();
            this.initialize();
        }
        
        /* bind */

        bind() {
            this.scope.register = form => this.register(form);
        }

        /* initialize */

        initialize() {
            this.scope.create = this.buildCreateRegistrationScope();
            this.scope.state = this.state;
        }

        /* get register uri */

        getRegisterUri(): string {
            return UriHelpers.join(this.baseAddress, 'register', this.state.token);
        }

        /* register */

        buildCreateRegistrationScope(): CreateRegistrationScope {
            return {
                email: this.state.email,
                password: null
            }
        }

        register(form?: ng.IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<{}>(this.getRegisterUri(), this.scope.create, this.buildRequestConfig())
                .success(p => this.registerSuccess())
                .error((d, s) => this.registerError(d, s)); 
        }   

        registerSuccess() {
            if (this.state.redirect) {
                this.location.url(this.state.redirect);
            }
        }

        registerError(data: any, status: number) {
            this.statusAlert(status);
        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "$q"];
    }

    export interface RegisterScope {
        create: CreateRegistrationScope;
        token: Token;
        state: InviteState;
        register(form?: ng.IFormController): void;
    }

    export interface RegisterState {
        token: string;
        email: string;
        redirect: string;
    }

    export interface CreateRegistrationScope {
        email: string;
        password: string;
    }
} 