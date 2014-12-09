declare module publishr {
    class Constants {
        static $inject: string[];
    }
}
declare module publishr {
    class HttpController<TScope extends HttpScope> {
        scope: TScope;
        http: ng.IHttpService;
        q: ng.IQService;
        protected cancellation: ng.IDeferred<{}>;
        constructor(scope: TScope, http: ng.IHttpService, q: ng.IQService);
        buildHttpPromise<T>(method: string, url: string, params: any, data: any): ng.IHttpPromise<T>;
        onRequestStart(): boolean;
        onRequestEnd(): void;
        onRequestCancel(): void;
        onRequestError(): void;
    }
}
declare module publishr {
    class CreateController<TModel> extends HttpController<CreateScope<TModel>> {
        baseAddress: string;
        scope: CreateScope<TModel>;
        location: ng.ILocationService;
        routeParams: ng.route.IRouteParamsService;
        http: ng.IHttpService;
        q: ng.IQService;
        constructor(baseAddress: string, scope: CreateScope<TModel>, location: ng.ILocationService, routeParams: ng.route.IRouteParamsService, http: ng.IHttpService, q: ng.IQService);
        createModel(): TModel;
        transformModel(model: TModel): any;
        postModel(): void;
        onPostSuccess(): void;
    }
}
declare module publishr {
    class EditController<T> extends HttpController<EditScope<T>> {
        baseAddress: string;
        scope: EditScope<T>;
        location: ng.ILocationService;
        routeParams: ng.route.IRouteParamsService;
        http: ng.IHttpService;
        q: ng.IQService;
        constructor(baseAddress: string, scope: EditScope<T>, location: ng.ILocationService, routeParams: ng.route.IRouteParamsService, http: ng.IHttpService, q: ng.IQService);
        transformModel(model: T): any;
        getModel(): void;
        patchModel(): void;
        onSaveSuccess(): void;
    }
}
declare module publishr {
    interface EditScope<T> extends HttpScope {
        model: T;
        save(): void;
        cancel(): void;
        busy: boolean;
    }
}
declare module publishr {
    interface CreateScope<T> extends HttpScope {
        model: T;
        save(): void;
    }
}
declare module publishr {
    interface HttpScope extends ng.IScope {
        cancel(): void;
        busy: boolean;
    }
}
declare module publishr {
    interface ListScope extends HttpScope {
        query: Query;
        data: Data;
        refresh(): void;
        more(): void;
    }
}
declare module publishr {
    class Query {
        kind: string;
        filter: string;
        sort: string;
        skip: number;
        take: number;
    }
}
declare module publishr {
    class Continuation {
        next: string;
        prev: string;
    }
}
declare module publishr {
    class Data {
        value: {}[];
        count: number;
        continuation: Continuation;
    }
}
declare module publishr {
    class ListController extends HttpController<ListScope> {
        baseAddress: string;
        scope: ListScope;
        location: ng.ILocationService;
        routeParams: ng.route.IRouteParamsService;
        http: ng.IHttpService;
        q: ng.IQService;
        constructor(baseAddress: string, scope: ListScope, location: ng.ILocationService, routeParams: ng.route.IRouteParamsService, http: ng.IHttpService, q: ng.IQService);
        query(url: string, params: any, append: boolean): void;
        getFirstPage(): void;
        getNextPage(): void;
        onQuerySuccess(data: Data, append: boolean): void;
        transformModel(value: any, index: number, array: any[]): void;
        buildQueryParams(routeParams: ng.route.IRouteParamsService, query: Query): {};
    }
}
