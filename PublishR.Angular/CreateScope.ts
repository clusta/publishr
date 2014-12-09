module publishr {
    'use strict';

    export interface CreateScope<T> extends HttpScope {
        model: T;
        save(form: ng.IFormController): void;
    }
}