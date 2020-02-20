export const CHANGE_MODE = 'CHANGE_MODE';
export const SET_TEMP = 'SET_TEMP';
export const LOAD_STORE = 'LOAD_STORE';
export const DEVICE_REGISTERED_SUCCESS = 'DEVICE_REGISTERED_SUCCESS';
export const DEVICE_REGISTERED_FAIL = 'DEVICE_REGISTERED_FAIL';
export const SENSORS_UPDATE = 'SENSORS_UPDATE';
export const OP_MODE_UPDATE = 'OP_MODE_UPDATE';

function payloadIsArg(type) {
    return payload => ({
        type: type,
        payload
    });
}

export const changeMode    = payloadIsArg(CHANGE_MODE);
export const setTemp       = payloadIsArg(SET_TEMP);
export const loadStore     = payloadIsArg(LOAD_STORE);
export const registerOk    = payloadIsArg(DEVICE_REGISTERED_SUCCESS);
export const registerFail  = payloadIsArg(DEVICE_REGISTERED_FAIL);
export const sensorsUpdate = payloadIsArg(SENSORS_UPDATE);
export const updateOpMode  = payloadIsArg(OP_MODE_UPDATE);
