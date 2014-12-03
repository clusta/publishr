module publishr {
    'use strict';

    export interface HttpController {
        onRequestStart();
        onRequestEnd();
        onRequestCancel();
        onRequestError();
    }
}