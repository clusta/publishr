module publishr.client {
    "use strict";

    export class Identity {
        id: string;
        token: string;
        email: string;
        workspace: string;
        roles: string[];
        properties: {};
    }
} 