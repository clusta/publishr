module publishr {
    'use strict';

    export interface ListScope extends ng.IScope {
        query: Query;
        data: Data;
        refresh(): void;
        more(): void;
        cancel(): void;
        busy: boolean;
    }
}