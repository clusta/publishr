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
            this.scope.create = this.buildCreateCommentScope();
        }

        /* get comment uri */

        getCommentUri(): string {
            return UriHelpers.join(this.api.baseAddress, 'comment') + '?path=' + this.state.path;
        }

        /* list */

        list() {
            this.http
                .get<Resource<Comment>[]>(this.getCommentUri(), this.api.config)
                .success(p => this.listSuccess(p))
                .error((d, s) => this.listError(d, s)); 
        }   

        listSuccess(list: Resource<Comment>[]) {
            this.scope.list = list;
        }

        listError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        /* create page */

        buildCreateCommentScope(kind?: string): CreateCommentScope {
            return {
                kind: 'comment',
                path: this.state.path,
                content: {
                    author: null,
                    text: {
                        format: null,
                        content: null
                    },
                    properties: {}
                }
            };
        }

        createComment(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<Resource<Comment>>(this.getCommentUri(), this.scope.create, this.api.config)
                .success(resource => this.createCommentSuccess(resource))
                .error((d, s) => this.createCommentError(d, s));
        }

        createCommentSuccess(resource: Resource<Comment>) {
            this.scope.create = this.buildCreateCommentScope();
            this.list();
        }

        createCommentError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
    }

    export interface CommentScope {
        list: Resource<Comment>[];
        create: CreateCommentScope;
        createComment(form?: IFormController): void;
    }

    export interface CreateCommentScope {
        kind: string;
        path: string;
        content: Comment;
    }

    export interface CommentState {
        path: string;
    }
} 