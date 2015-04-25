module publishr.client {
    "use strict";

    export class CommentController {
        constructor(
            public scope: CommentScope,
            public state: CommentState,
            public location: ILocationService,
            public http: IHttpService,
            public api: IApi,
            public alert: IAlert)
        {
            this.initialize();
        }
        
        /* initialize */

        initialize() {

        }

        /* get comments uri */

        getCommentsUri(): string {
            return StringHelpers.trimEnd(this.api.baseAddress, '/')
                + '/comment/'
                + this.state.id;
        }

        /* get comments */

        getComments() {
            this.http
                .get<Comment[]>(this.getCommentsUri(), this.api.config)
                .success(p => this.getCommentsSuccess(p))
                .error((d, s) => this.getCommentsError(d, s)); 
        }   

        getCommentsSuccess(comments: Comment[]) {
            this.scope.data = comments;
        }

        getCommentsError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
    }

    export interface CommentScope {
        data: Comment[];
    }

    export interface CommentState {
        id: string;
    }
} 