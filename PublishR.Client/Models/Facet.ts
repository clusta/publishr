module publishr.client {
    "use strict";

    export class Facet {
        category: string;
        name: string;
        value: any;
        count: number;
        properties: { [name: string]: any };
    }
} 