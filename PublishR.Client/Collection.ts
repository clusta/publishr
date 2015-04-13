module publishr.client {
    "use strict";

    export class Collection {
        kind: string;
        created: Date;
        updated: Date;
        cover: Cover;
        listings: Listing[];
        facets: Facet[];
        continuation: string;
        properties: any;
    }
} 