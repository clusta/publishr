module publishr {
    'use strict';

    export interface ListScope extends HttpScope {
        query: Query;
        data: Data;
        refresh(): void;
        more(): void;
    }
}