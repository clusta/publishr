module publishr {
    'use strict';

    export class Query {
        kind: string;
        filter: string;
        sort: string;
        skip: number;
        take: number;
    }
}