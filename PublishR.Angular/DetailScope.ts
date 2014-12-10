module publishr {
    'use strict';

    export interface DetailScope<T> extends HttpScope {
        model: T;
    }
}