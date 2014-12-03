module publishr {
    'use strict';

    export interface EditScope<T> extends ng.IScope {
        model: T;
        save(): void;
        cancel(): void;
        busy: boolean;
    }
}