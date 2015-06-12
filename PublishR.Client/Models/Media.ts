module publishr.client {
    "use strict";

    export class Media {
        format: string;
        caption: string;
        credit: string;
        sources: Source[];
        properties: { [name: string]: any };
    }
} 