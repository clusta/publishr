module publishr.client {
    "use strict";

    export class UriHelpers {
        public static join(...segments: string[]) {
            return segments
                .filter(Boolean) // remove empty strings
                .map(s => StringHelpers.trimEnd(s, '/'))
                .join('/');
        } 
    }
} 