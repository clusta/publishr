module publishr.client {
    "use strict";

    export interface IHttpService {
        get<T>(uri: string, config?: any): IHttpPromise<T>;
        post<T>(url: string, data: any, config?: any): IHttpPromise<T>;
        put<T>(url: string, data: any, config?: any): IHttpPromise<T>;
        delete<T>(url: string, config?: any): IHttpPromise<T>;
    }

    export interface IHttpPromise<T> {
        success(callback: IHttpPromiseCallback<T>): IHttpPromise<T>;
        error(callback: IHttpPromiseCallback<any>): IHttpPromise<T>;
    }

    export interface IHttpPromiseCallback<T> {
        (data: T, status: number, headers: any, config: any): void;
    }
} 