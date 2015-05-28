module publishr.starter {
    "use strict";

    export class StarterAlert implements publishr.client.IAlert {
        showAlert(message: string) {
            window.alert(message);
        }
    }

    var bearerToken = window.localStorage.getItem('bearerToken');

    export var StarterApi: publishr.client.IApi = {
        baseAddress: 'http://localhost:60423/api',
        config: {
            headers: {
                Authorization: (bearerToken ? 'Bearer ' + bearerToken : null)
            }
        }
    };
}  