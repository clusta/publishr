module publishr.client {
    "use strict";

    export class Listing {
        uri: string;
        kind: string;
        category: string;
        author: Author;
        created: Date;
        updated: Date;
        cards: CardSet;
        properties: any;
    }
} 