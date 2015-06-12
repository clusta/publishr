module publishr.client {
    "use strict";

    export class Schedule {
        start: Date;
        end: Date;
        properties: { [name: string]: any };
    }
} 