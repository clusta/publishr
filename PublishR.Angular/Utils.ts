module publishr {
    'use strict';

    export class Utils {
        static copyLeft(...items: {}[]): any {
            var objectCopy = {};

            for (var i = 0; i < items.length; i++) {
                var object = items[i];

                for (var key in object) {
                    if (object.hasOwnProperty(key)) {
                        objectCopy[key] = object[key];
                    }
                }
            }

            return objectCopy;
        }
    }
}