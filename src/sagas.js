import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
    CHANGE_MODE,
    SET_TEMP,
    loadStore,
    registerOk,
    registerFail
} from './redux/messages';
import { registerDevice } from './network';

const localstorage_key = 'thermostat.store';

const identity = a => a;

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

function* maybeRegisterDevice() {
    let device_uuid = yield select(store => store.device_uuid);

    if (!device_uuid) {
        console.log("device_uuid:", device_uuid);
        try {
            let result = yield call(registerDevice);
            console.log('api ok', result);
            yield put(registerOk(result));
        } catch (e) {
            console.error(e);
            yield put(registerFail(e));
        }
    }
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

function* thermostatSaga() {
    yield* storageInitialization();
    yield* maybeRegisterDevice();
    yield takeLatest(CHANGE_MODE, changeMode);
    yield takeLatest(SET_TEMP, setTemp);
}

export default thermostatSaga;
