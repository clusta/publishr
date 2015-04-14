module publishr.client {
    "use strict";

    export class ArrayHelpers {
        // http://jeffijoe.com/2013/08/moving-elements-up-and-down-in-a-javascript-array/
        public static moveUp<T>(arry: Array<T>, value: T, by?: number) {
            var index = arry.indexOf(value);
            var newPos = index - (by || 1);

            if (index === -1)
                throw new Error('Element not found in array');

            if (newPos < 0)
                newPos = 0;

            arry.splice(index, 1);
            arry.splice(newPos, 0, value);
        }

        public static moveDown<T>(arry: Array<T>, value: T, by?: number) {
            var index = arry.indexOf(value);
            var newPos = index + (by || 1);

            if (index === -1)
                throw new Error('Element not found in array');

            if (newPos >= this.length)
                newPos = this.length;

            arry.splice(index, 1);
            arry.splice(newPos, 0, value);
        }
    }
} 