module publishr.client {
    "use strict";

    export class Page {
        kind: string;
        created: Date;
        updated: Date;
        cover: Cover;
        tags: string[];
        metadata: Metadata;
        cards: CardSet;
        sections: Section[]; 
        credits: Credit[];
        schedule: Schedule;
        properties: any;
    }
} 