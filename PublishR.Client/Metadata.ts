module publishr.client {
    "use strict";

    export class Metadata {
        created: Date;
        updated: Date;
        workspace: string;
        kind: string;
        path: string;
        state: string;
        privacy: string;
        owner: string;
        properties: any;
    }
} 