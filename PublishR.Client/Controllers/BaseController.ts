﻿module publishr.client {
    "use strict";

    export class BaseController {
        constructor(
            private $window: ng.IWindowService,
            private $q: ng.IQService) {

        }

        public messages: { [key: number]: string } = {
            400: "Please re-check your input and re-send.",
            403: "You do not have permission to complete the request.",
            404: "Page could not be found. Please go back.",
            409: "Input not saved as it is a duplicate.",
            500: "There was a problem completing your request. Please try again."
        };

        public status(status: number) {
            var message = this.messages[status];

            if (message) {
                this.$window.alert(message);
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

        public prompt(message: string, action: () => void, args: any[]) {
            var value = this.$window.prompt(message);

            if (value) {
                if (args && !(args instanceof Array && args.length == 0)) {
                    args.unshift(value);

                    action.apply(this, args);
                }
                else {
                    action.call(this, value);
                }
            }
        }

        public confirm(message: string, action: () => void, args: any[]) {
            var accept = this.$window.confirm(message);

            if (accept) {
                action.apply(this, args);
            }
        }

        public keys(obj: any): string[] {
            return Object.keys(obj);
        }
    }
} 