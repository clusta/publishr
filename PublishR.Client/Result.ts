module publishr.client {
    "use strict";

    export class Result {
        listings: Listing[];
        facets: Facet[];
        continuation: string;
        properties: any;
    }
} 