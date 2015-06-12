module publishr.client {
    "use strict";

    export class Result {
        items: Array<any>;
        facets: Facet[];
        continuation: Continuation;
        properties: { [name: string]: any };
    }
} 