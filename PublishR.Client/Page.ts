module publishr.client {
    "use strict";

    export class Page {
        kind: string;
        created: Date;
        updated: Date;
        tags: string[];
        metadata: Metadata;
        cards: any;
        sections: Section[]; 
        credits: Credit[];
        schedules: Schedule[];
        properties: any;
    }
} 