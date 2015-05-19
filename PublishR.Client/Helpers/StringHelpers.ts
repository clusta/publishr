module publishr.client {
    "use strict";

    export class StringHelpers {
        public static trimEnd(text: string, char: string) {
            if (text.substr(-char.length) == char) {
                return text.substr(0, text.length - char.length);
            }
            return text;          
        } 
    }
} 