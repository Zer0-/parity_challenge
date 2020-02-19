import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
    CHANGE_MODE,
    SET_TEMP,
    loadStore
} from './redux/messages';

const localstorage_key = 'thermostat.store';

function loadFromStorage() {
    return new Promise((resolve, reject) => {
        let storedStore = window.localStorage.getItem(localstorage_key);
        console.log('loadFromStorage', storedStore);

        if (storedStore) {
            try {
                resolve(JSON.parse(storedStore));
            } catch (e) {
                reject(e);
            }
        } else {
            reject();
        }
    });
}

function saveToLocalStorage(store) {
    return new Promise(resolve => {
        resolve(
            window.localStorage.setItem(
                localstorage_key,
                JSON.stringify(store)
            )
        );
    });
}

const identity = a => a;

function* saveState() {
    let store = yield select(identity);
    yield call(saveToLocalStorage, store);
}

function* changeMode(new_mode) {
    console.log('changeMode saga gen. new_mode value:', new_mode);
    yield* saveState();
}

function* setTemp(new_temp) {
    console.log('setTemp saga gen. new_temp value:', new_temp);
    yield* saveState();
}

function* storageInitialization() {
    try {
        console.log("Loading");
        let saved_store = yield call(loadFromStorage);
        console.log("Loaded store from localStorage");
        yield put(loadStore(saved_store));
    } catch {
        console.log("Did not load from localStorage");
        return;
    }
}

//call loadFromStorage (which should return a promise)
//yield a LOAD_STORE with payload
//if we CHANGE_MODE or SET_TEMP call saveToLocalStorage

function* thermostatSaga() {
    yield* storageInitialization();
    yield takeLatest(CHANGE_MODE, changeMode);
    yield takeLatest(SET_TEMP, setTemp);
}

export default thermostatSaga;
