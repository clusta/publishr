module publishr.client {
    "use strict";

    export class Resource<T> {
        id: string;
        metadata: Metadata;
        content: T;
        properties: any;
    }
} 