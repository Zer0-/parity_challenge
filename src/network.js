const API_URL_BASE = 'https://api-staging.paritygo.com/sensors/api';
export const REGISTER_URL = API_URL_BASE + '/thermostat/register/';

function resolveResponse(resolve, reject) {
    return e => {
        if (e.target.status === 200) {
            return resolve(JSON.parse(e.target.responseText));
        } else {
            reject(new Error('API responded with ' + e.target.status));
        }
    }
}

export function get(url) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.onload = resolveResponse(resolve, reject);
        req.onerror = reject;
        req.open('GET', url);
        req.setRequestHeader("Accept", "application/json");
        req.send();
    });
}

function requestWithJsonBody(url, payload, reqType) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.onload = resolveResponse(resolve, reject);
        req.onerror = reject;
        req.open(reqType, url);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify(payload));
    });
}

export function post(url, payload) {
    return requestWithJsonBody(url, payload, 'POST');
}

export function patch(url, payload) {
    return requestWithJsonBody(url, payload, 'PATCH');
}


/*
 * Example Response:
 *

{
    "uid_hash": "e68168a449bd4cc7a4f9b04ea236db8f",
    "state": "auto_standby"
}

*/
export function registerDevice() {
    return get(REGISTER_URL);
    //return post(REGISTER_URL, { state: 'auto_standby' });
}
