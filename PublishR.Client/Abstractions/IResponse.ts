module publishr.client {
    "use strict";

    export interface IResponse {
        400?: string | boolean | Function;
        401?: string | boolean | Function;
        403?: string | boolean | Function;
        404?: string | boolean | Function;
        500?: string | boolean | Function;
    }

    export class ResponseHelpers {
        public static defaults: IResponse = {
            "400": "Please re-check your input and re-send.",
            "403": "You do not have permission to complete the request.",
            "404": "Page could not be found. Please go back.",
            "409": "Input not saved as it is a duplicate.",
            "500": "There was a problem completing your request. Please try again."
        }
    }
} 