module publishr.client {
    "use strict";

    export class Listing {
        id: string;
        meta: Meta;
        cards: { [name: string]: Card };
        properties: { [name: string]: any };
    }
} 