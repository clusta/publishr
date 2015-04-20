module publishr.client {
    "use strict";

    export interface IHttpService {
        get<T>(uri: string, IHttpConfig?: any): IHttpPromise<T>;
        post<T>(url: string, data: any, IHttpConfig?: any): IHttpPromise<T>;
        put<T>(url: string, data: any, IHttpConfig?: any): IHttpPromise<T>;
        delete<T>(url: string, IHttpConfig?: any): IHttpPromise<T>;
    }

    export interface IHttpPromise<T> {
        success(callback: IHttpPromiseCallback<T>): IHttpPromise<T>;
        error(callback: IHttpPromiseCallback<any>): IHttpPromise<T>;
    }

    export interface IHttpPromiseCallback<T> {
        (data: T, status: number, headers: any, config: any): void;
    }

    export interface IHttpConfig {
        headers?: IHttpHeaders;
    }

    export interface IHttpHeaders {
        Authorization?: string;
    }
} 