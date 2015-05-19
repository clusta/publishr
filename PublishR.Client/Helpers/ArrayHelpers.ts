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

            if (newPos >= arry.length)
                newPos = arry.length;

            arry.splice(index, 1);
            arry.splice(newPos, 0, value);
        }

        public static insert<T>(arry: Array<T>, value: T, index?: number) {
            if (typeof index !== "number" || index >= arry.length) {
                arry.push(value);
            }
            else if (index <= 0) {
                arry.unshift(value);
            }
            else {
                arry.splice(index, 0, value);
            }
        }

        public static remove<T>(arry: Array<T>, index: number) {
            arry.splice(index, 1);
        }

        public static mergeLeft(obj1: any, obj2: any): any {
            for (var attrname in obj2) {
                obj1[attrname] = obj2[attrname];
            }

            return obj1;
        }
    }
} 