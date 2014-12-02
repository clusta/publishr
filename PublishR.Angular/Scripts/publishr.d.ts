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
    class FeedController {
        uri: string;
        $scope: FeedScope;
        $route: ng.route.IRouteParamsService;
        $http: ng.IHttpService;
        $q: ng.IQService;
        private canceller;
        constructor(uri: string, $scope: FeedScope, $route: ng.route.IRouteParamsService, $http: ng.IHttpService, $q: ng.IQService);
        query(url: string, params: any, replace: boolean): void;
        load(): void;
        next(): void;
        success(data: Data, replace: boolean): void;
        error(): void;
        cancel(): void;
        transform(value: any, index: number, array: any[]): void;
        params($rootParams: ng.route.IRouteParamsService, query: Query): {};
    }
}
declare module publishr {
    interface FeedScope extends ng.IScope {
        query: Query;
        data: Data;
        load(): void;
        next(): void;
        cancel(): void;
        busy: boolean;
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
