module publishr.client {
    "use strict";

    export class Identity {
        uid: string;
        accesstoken: string;
        email: string;
        workspace: string;
        roles: Array<string>;
        properties: any;
    }
} 