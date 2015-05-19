module publishr.client {
    "use strict";

    export class Section {
        layout: string;
        zone: string;
        blocks: {};
        links: Link[];
        fields: Field[];
        media: Media[];
        schedules: Schedule[];
        properties: any;
    }
} 