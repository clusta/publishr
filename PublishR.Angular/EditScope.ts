﻿module publishr {
    'use strict';

    export interface EditScope<T> extends HttpScope {
        model: T;
        save(): void;
        cancel(): void;
        busy: boolean;
    }
}