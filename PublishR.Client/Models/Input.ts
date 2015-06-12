module publishr.client {
    "use strict";

    export class Input {
        type: string;
        name: string;
        label: string;
        description: string;
        hint: string;
        pattern: string;
        required: boolean;
        range: Range;
        length: Length;
        value: any;
        options: Option[];
        properties: { [name: string]: any };
    }
} 