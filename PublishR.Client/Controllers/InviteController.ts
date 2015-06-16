module publishr.client {
    "use strict";

    export class InviteController extends BaseController {
        constructor(
            public scope: InviteScope,
            public state: InviteState,
            public window: ng.IWindowService,
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
            this.scope.invite = form => this.invite(form);
        }

        /* initialize */

        initialize() {
            this.scope.create = this.buildCreateInviteScope();
            this.scope.state = this.state;
        }

        /* get invite uri */

        getInviteUri(): string {
            return UriHelpers.join(this.baseAddress, 'invite');
        }

        /* invite */

        buildCreateInviteScope(): CreateInviteScope {
            return {
                email: null,
                roles: [
                    'member'
                ]
            }
        }

        invite(form?: ng.IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<Token>(this.getInviteUri(), this.scope.create, this.buildRequestConfig())
                .success(p => this.inviteSuccess(p))
                .error((d, s) => this.inviteError(d, s)); 
        }   

        inviteSuccess(token: Token) {            
            this.scope.success = {
                email: this.scope.create.email,
                token: token
            };

            this.scope.create = this.buildCreateInviteScope();
        }

        inviteError(data: any, status: number) {
            this.statusAlert(status);
        }

        static $inject = ["$scope", "$stateParams", "$window", "$location", "$http", "$q"];
    }

    export interface InviteScope {
        create: CreateInviteScope;
        success: SuccessInviteScope;
        state: InviteState;
        invite(form?: ng.IFormController): void;
    }

    export interface InviteState {

    }

    export interface CreateInviteScope {
        email: string;
        roles: Array<string>;
    }

    export interface SuccessInviteScope {
        email: string;
        token: Token;
    }
} 