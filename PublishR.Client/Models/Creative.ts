module publishr.client {
    "use strict";

    export class Creative {
        title: string;
        blocks: { [name: string]: Block };
        properties: { [name: string]: any };
    }
} 