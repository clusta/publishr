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
            this.bind();
            this.initialize();
        }
        
        /* bind */

        bind() {
            this.scope.createComment = form => this.createComment(form);
        }

        /* initialize */

        initialize() {
            this.scope.create = {
                uri: this.state.id,
                text: {
                    format: null,
                    content: null
                }
            };
        }

        /* get comments uri */

        getCommentsUri(): string {
            return StringHelpers.trimEnd(this.api.baseAddress, '/')
                + '/comment/';
        }

        /* get comments */

        getComments() {
            this.http
                .get<Comment[]>(this.getCommentsUri() + '?uri=' + this.state.id, this.api.config)
                .success(p => this.getCommentsSuccess(p))
                .error((d, s) => this.getCommentsError(d, s)); 
        }   

        getCommentsSuccess(comments: Comment[]) {
            this.scope.data = comments;
        }

        getCommentsError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        /* create comment */

        createComment(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<Resource>(this.getCommentsUri(), this.scope.create, this.api.config)
                .success(resource => this.createCommentSuccess(resource))
                .error((d, s) => this.createCommentError(d, s));
        }

        createCommentSuccess(resource: Resource) {
            this.initialize();
            this.getComments();
        }

        createCommentError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
    }

    export interface CommentScope {
        data: Comment[];
        create: CreateCommentScope;
        createComment(form?: IFormController): void;
    }

    export interface CreateCommentScope {
        uri: string;
        text: Block;
    }

    export interface CommentState {
        id: string;
    }
} 