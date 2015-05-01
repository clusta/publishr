module publishr.client {
    "use strict";

    export class Section {
        layout: string;
        region: string;
        blocks: any;
        links: Link[];
        fields: Field[];
        media: Media[];
        schedules: Schedule[];
        properties: any;
    }
} 