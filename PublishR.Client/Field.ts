module publishr.client {
    "use strict";

    export class Field {
        input_type: string;
        name: string;
        label: string;
        description: string;
        required: boolean;
        options: Option[];
        properties: any;
    }
} 