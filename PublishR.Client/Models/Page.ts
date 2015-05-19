module publishr.client {
    "use strict";

    export class Page {
        tags: string[];
        cards: any;
        sections: Section[]; 
        credits: Credit[];
        schedules: Schedule[];
        properties: any;
    }
} 