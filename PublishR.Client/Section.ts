module publishr.client {
    "use strict";

    export class Section {
        format: string;
        heading: string;
        content: string;
        links: Link[];
        fields: Field[];
        media: Media[];
        schedule: Schedule;
        properties: any;
    }
} 