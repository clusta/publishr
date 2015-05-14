module publishr.client {
    "use strict";

    export class RegisterController {
        constructor(
            public scope: RegisterScope,
            public state: RegisterState,
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
            this.scope.register = form => this.register(form);
        }

        /* initialize */

        initialize() {
            this.scope.create = this.buildCreateRegistrationScope();
            this.scope.state = this.state;
        }

        /* get register uri */

        getRegisterUri(): string {
            return UriHelpers.join(this.api.baseAddress, 'register', this.state.token);
        }

        /* register */

        buildCreateRegistrationScope(): CreateRegistrationScope {
            return {
                email: this.state.email,
                password: null
            }
        }

        register(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<{}>(this.getRegisterUri(), this.scope.create, this.api.config)
                .success(p => this.registerSuccess())
                .error((d, s) => this.registerError(d, s)); 
        }   

        registerSuccess() {

        }

        registerError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
    }

    export interface RegisterScope {
        create: CreateRegistrationScope;
        token: Token;
        state: InviteState;
        register(form?: IFormController): void;
    }

    export interface RegisterState {
        token: string;
        email: string;
    }

    export interface CreateRegistrationScope {
        email: string;
        password: string;
    }
} 