module publishr.client {
    "use strict";

    export class Author {
        alias: string;
        name: string;
        uri: string;
        images: Source[];
        properties: { [name: string]: any };
    }
} 