module publishr.client {
    "use strict";

    export class Cover {
        category: string;
        title: string;
        description: string;
        author: Author;
        photos: Source[];
        properties: any;
    }
} 