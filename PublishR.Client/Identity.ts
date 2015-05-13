module publishr.client {
    "use strict";

    export class Identity {
        uid: string;
        accesstoken: string;
        email: string;
        roles: Array<string>;
        parameters: any;
    }
} 