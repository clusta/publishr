module publishr.client {
    "use strict";

    export class Section {
        format: string;
        blocks: BlockSet;
        links: Link[];
        fields: Field[];
        media: Media[];
        schedule: Schedule;
        properties: any;
    }
} 