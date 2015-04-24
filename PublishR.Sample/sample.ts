module publishr.sample {
    "use strict";

    export class SampleAlert implements publishr.client.IAlert {
        showAlert(message: string) {
            window.alert(message);
        }
    }

    var bearerToken = window.localStorage.getItem('bearerToken');

    export var SampleApi: publishr.client.IApi = {
        baseAddress: '/api',
        config: {
            headers: {
                Authorization: (bearerToken ? 'Bearer ' + bearerToken : null)
            }
        }
    };
}  