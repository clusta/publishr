module publishr {
    'use strict';

    export interface CreateScope<T> extends ng.IScope {
        model: T;
        save(): void;
        cancel(): void;
        busy: boolean;
    }
}