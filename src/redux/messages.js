export const CHANGE_MODE = 'CHANGE_MODE';
export const SET_TEMP = 'SET_TEMP';
export const LOAD_STORE = 'LOAD_STORE';

export const changeMode = newMode => ({
    type: CHANGE_MODE,
    payload: newMode
});

export const setTemp = newTemp => ({
    type: SET_TEMP,
    payload: newTemp
});

export const loadStore = saved_store => ({
    type: LOAD_STORE,
    payload: saved_store
});


