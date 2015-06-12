module publishr.client {
    "use strict";

    export class BaseController {
        constructor() {

        }

        public alert = {
            "400": "Please re-check your input and re-send.",
            "403": "You do not have permission to complete the request.",
            "404": "Page could not be found. Please go back.",
            "409": "Input not saved as it is a duplicate.",
            "500": "There was a problem completing your request. Please try again."
        };

        public statusAlert(status: number) {
            var message = this.alert[status];

            if (message) {
                alert(message);
            }
        }

        get baseAddress(): string {
            return document
                .querySelector('link[rel="publishr:baseAddress"')
                .getAttribute('href');
        }

        get bearerToken(): string {
            return localStorage.getItem('publishr:bearerToken');
        }

        set bearerToken(value: string) {
            localStorage.setItem('publishr:bearerToken', value);
        }

        public buildRequestConfig(): ng.IRequestShortcutConfig {
            return {
                headers: {
                    Authorization: 'Bearer ' + this.bearerToken
                }
            }
        }
    }
} 