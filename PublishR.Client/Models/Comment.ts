﻿module publishr.client {
    "use strict";

    export class Comment {
        author: Author;
        text: string;
        properties: { [name: string]: any };
    }
} 