module publishr.client {
    "use strict";

    export class Result {
        items: Array<{}>;
        facets: Facet[];
        continuation: string;
        properties: any;
    }
} 