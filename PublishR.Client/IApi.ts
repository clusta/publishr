module publishr.client {
    "use strict";

    export interface IApi {
        baseAddress: string;
        config?: IHttpConfig;
    }
} 