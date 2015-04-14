module publishr.client {
    "use strict";

    export class Identity {
        uid: string;
        access_token: string;
        email: string;
        roles: Array<string>;
        parameters: any;
    }
} 