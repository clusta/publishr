module publishr.client {
    "use strict";

    export class Page {
        template: string;
        tags: string[];
        cards: {};
        sections: Section[]; 
        credits: Credit[];
        schedules: Schedule[];
        properties: {};
    }
} 