export const CHANGE_MODE = 'CHANGE_MODE';
export const SET_TEMP = 'SET_TEMP';
export const LOAD_STORE = 'LOAD_STORE';
export const DEVICE_REGISTERED_SUCCESS = 'DEVICE_REGISTERED_SUCCESS';
export const DEVICE_REGISTERED_FAIL = 'DEVICE_REGISTERED_FAIL';

function payloadIsArgs(type) {
    return payload => ({
        type: type,
        payload
    });
}

export const changeMode   = payloadIsArgs(CHANGE_MODE);
export const setTemp      = payloadIsArgs(SET_TEMP);
export const loadStore    = payloadIsArgs(LOAD_STORE);
export const registerOk   = payloadIsArgs(DEVICE_REGISTERED_SUCCESS);
export const registerFail = payloadIsArgs(DEVICE_REGISTERED_FAIL);
