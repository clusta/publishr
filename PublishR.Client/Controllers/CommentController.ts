module publishr.client {
    "use strict";

    export class CommentController extends BaseController {
        constructor(
            public scope: CommentScope,
            public state: CommentState,
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
            this.scope.createComment = form => this.createComment(form);
        }

        /* initialize */

        initialize() {
            this.scope.create = this.buildCreateCommentScope();
        }

        /* get comment uri */

        getCommentUri(): string {
            return UriHelpers.join(this.baseAddress, 'comment') + '?path=' + this.state.path;
        }

        /* list */

        list() {
            this.http
                .get<Resource<Comment>[]>(this.getCommentUri(), this.buildRequestConfig())
                .success(p => this.listSuccess(p))
                .error((d, s) => this.listError(d, s)); 
        }   

        listSuccess(list: Resource<Comment>[]) {
            this.scope.list = list;
        }

        listError(data: any, status: number) {
            this.status(status);
        }

        /* create comment */

        buildCreateCommentScope(kind?: string): CreateCommentScope {
            return {
                kind: 'comment',
                path: this.state.path,
                data: {
                    author: null,
                    text: null,
                    properties: {}
                }
            };
        }

        createComment(form?: ng.IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<Resource<Comment>>(this.getCommentUri(), this.scope.create, this.buildRequestConfig())
                .success(resource => this.createCommentSuccess(resource))
                .error((d, s) => this.createCommentError(d, s));
        }

        createCommentSuccess(resource: Resource<Comment>) {
            this.scope.create = this.buildCreateCommentScope();
            this.list();
        }

        createCommentError(data: any, status: number) {
            this.status(status);
        }

        static $inject = ["$scope", "$stateParams", "$window", "$location", "$http", "$q"];
    }

    export interface CommentScope {
        list: Resource<Comment>[];
        create: CreateCommentScope;
        createComment(form?: ng.IFormController): void;
    }

    export interface CreateCommentScope {
        kind: string;
        path: string;
        data: Comment;
    }

    export interface CommentState {
        path: string;
    }
} 