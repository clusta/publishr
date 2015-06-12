module publishr.client {
    "use strict";

    export class Page {
        tags: string[];
        cards: {[name: string]: Card};
        regions: {[name: string]: Region}; 
        results: {[name: string]: Result};
        credits: Credit[];
        schedules: Schedule[];
        properties: {[name: string]: any};
    }
} 