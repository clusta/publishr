declare module publishr {
    class Constants {
        static $inject: string[];
    }
}
declare module publishr {
    class EditController<T> implements HttpController {
        baseAddress: string;
        scope: EditScope<T>;
        location: ng.ILocationService;
        routeParams: ng.route.IRouteParamsService;
        http: ng.IHttpService;
        q: ng.IQService;
        private cancellation;
        constructor(baseAddress: string, scope: EditScope<T>, location: ng.ILocationService, routeParams: ng.route.IRouteParamsService, http: ng.IHttpService, q: ng.IQService);
        createModel(): T;
        transformModel(model: T): any;
        getModel(): void;
        patchModel(): void;
        onSaveSuccess(): void;
        onRequestStart(): void;
        onRequestEnd(): void;
        onRequestCancel(): void;
        onRequestError(): void;
    }
}
declare module publishr {
    class CreateController<T> implements HttpController {
        baseAddress: string;
        scope: CreateScope<T>;
        location: ng.ILocationService;
        routeParams: ng.route.IRouteParamsService;
        http: ng.IHttpService;
        q: ng.IQService;
        private cancellation;
        constructor(baseAddress: string, scope: CreateScope<T>, location: ng.ILocationService, routeParams: ng.route.IRouteParamsService, http: ng.IHttpService, q: ng.IQService);
        createModel(): T;
        transformModel(model: T): any;
        postModel(): void;
        onPostSuccess(): void;
        onRequestStart(): void;
        onRequestEnd(): void;
        onRequestCancel(): void;
        onRequestError(): void;
    }
}
declare module publishr {
    interface EditScope<T> extends ng.IScope {
        model: T;
        save(): void;
        cancel(): void;
        busy: boolean;
    }
}
declare module publishr {
    interface CreateScope<T> extends ng.IScope {
        model: T;
        save(): void;
        cancel(): void;
        busy: boolean;
    }
}
declare module publishr {
    interface ListScope extends ng.IScope {
        query: Query;
        data: Data;
        refresh(): void;
        more(): void;
        cancel(): void;
        busy: boolean;
    }
}
declare module publishr {
    interface HttpController {
        onRequestStart(): any;
        onRequestEnd(): any;
        onRequestCancel(): any;
        onRequestError(): any;
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
    class ListController implements HttpController {
        baseAddress: string;
        scope: ListScope;
        location: ng.ILocationService;
        routeParams: ng.route.IRouteParamsService;
        http: ng.IHttpService;
        q: ng.IQService;
        private cancellation;
        constructor(baseAddress: string, scope: ListScope, location: ng.ILocationService, routeParams: ng.route.IRouteParamsService, http: ng.IHttpService, q: ng.IQService);
        query(url: string, params: any, append: boolean): void;
        getFirstPage(): void;
        getNextPage(): void;
        onQuerySuccess(data: Data, append: boolean): void;
        onRequestStart(): void;
        onRequestEnd(): void;
        onRequestCancel(): void;
        onRequestSuccess(): void;
        onRequestError(): void;
        transformModel(value: any, index: number, array: any[]): void;
        buildQueryParams(routeParams: ng.route.IRouteParamsService, query: Query): {};
    }
}
