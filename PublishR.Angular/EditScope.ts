module publishr {
    'use strict';

    export interface EditScope<T> extends HttpScope {
        model: T;
        save(form: ng.IFormController): void;
    }
}