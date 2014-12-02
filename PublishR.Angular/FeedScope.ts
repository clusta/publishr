module publishr {
    'use strict';

    export interface FeedScope extends ng.IScope {
        query: Query;
        data: Data;
        load(): void;
        next(): void;
        busy: boolean;
    }
}