module publishr.client {
    "use strict";

    export class InviteController {
        constructor(
            public scope: InviteScope,
            public state: InviteState,
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
            this.scope.invite = form => this.invite(form);
        }

        /* initialize */

        initialize() {
            this.scope.create = this.buildCreateInviteScope();
            this.scope.state = this.state;
        }

        /* get invite uri */

        getInviteUri(): string {
            return UriHelpers.join(this.api.baseAddress, 'invite');
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

        invite(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<Token>(this.getInviteUri(), this.scope.create, this.api.config)
                .success(p => this.inviteSuccess(p))
                .error((d, s) => this.inviteError(d, s)); 
        }   

        inviteSuccess(token: Token) {
            this.scope.create = this.buildCreateInviteScope();
            this.scope.token = token;

            this.alert.showAlert('Invite created');
        }

        inviteError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
    }

    export interface InviteScope {
        create: CreateInviteScope;
        token: Token;
        state: InviteState;
        invite(form?: IFormController): void;
    }

    export interface InviteState {

    }

    export interface CreateInviteScope {
        email: string;
        roles: Array<string>;
    }
} 