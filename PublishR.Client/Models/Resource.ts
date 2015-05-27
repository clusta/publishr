module publishr.client {
    "use strict";

    export class Resource<T> {
        id: string;
        meta: Meta;
        data: T;
        properties: {};
    }
} 