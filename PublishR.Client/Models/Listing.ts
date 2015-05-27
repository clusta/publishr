module publishr.client {
    "use strict";

    export class Listing {
        id: string;
        uri: string;
        kind: string;
        category: string;
        author: Author;
        created: Date;
        updated: Date;
        cards: {};
        properties: {};
    }
} 