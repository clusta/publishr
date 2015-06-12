module publishr.client {
    "use strict";

    export class Section {
        template: string;
        blocks: { [name: string]: Block };
        schedules: Schedule[];
        properties: { [name: string]: any };
    }
} 