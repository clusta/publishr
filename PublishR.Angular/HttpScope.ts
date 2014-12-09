module publishr {
    'use strict';

    export interface HttpScope extends ng.IScope {
        cancel(): void;
        busy: boolean;
    }
}