module publishr.client {
    "use strict";

    export interface IApi {
        baseAddress: string;
        config?: IHttpConfig;
    }

    export interface IHttpConfig {
        headers?: IHttpHeaders;
    }

    export interface IHttpHeaders {
        Authorization?: string;
    }
} 