export const CHANGE_MODE = 'CHANGE_MODE';
export const SET_TEMP = 'SET_TEMP';

export const changeMode = newMode => ({
    type: CHANGE_MODE,
    payload: newMode
});

export const setTemp = newTemp => ({
    type: SET_TEMP,
    payload: newTemp
});
