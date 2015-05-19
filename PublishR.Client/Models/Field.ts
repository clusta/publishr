module publishr.client {
    "use strict";

    export class Field {
        input: string;
        name: string;
        label: string;
        description: string;
        required: boolean;
        options: Option[];
        properties: any;
    }
} 