import moment from 'moment';
import {
    takeLatest,
    call,
    put,
    putResolve,
    select
} from 'redux-saga/effects';
import {
    CHANGE_MODE,
    SET_TEMP,
    loadStore,
    registerOk,
    registerFail,
    sensorsUpdate
} from './redux/messages';
import {
    registerDevice,
    sensorsOverview,
    sensorDetail
} from './network';
import { average } from './redux/reducers/thermostat';

const localstorage_key = 'thermostat.store';
const api_poll_interval_seconds = 60;

const identity = a => a;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

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
    console.log('saveToLocalStorage:', store);
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
    let device_id = yield select(store => store.device_id);

    if (!device_id) {
        console.log("device_id:", device_id);
        try {
            let result = yield call(registerDevice);
            console.log('api ok', result);
            yield putResolve(registerOk(result));
            yield* saveState();
        } catch (e) {
            console.error(e);
            yield put(registerFail(e));
        }
    }
}

function* storageInitialization() {
    try {
        let saved_store = yield call(loadFromStorage);
        console.log("Loaded store from localStorage");
        yield put(loadStore(saved_store));
    } catch {
        console.log("Did not load from localStorage");
    }
}

function getSensorSeries(overview) {
    let latest_time = moment(overview.latest_value_timestamp);

    //Just in case the sensor is broken
    if (latest_time.diff(moment(), 'minutes') > 10) {
        //Need to do something intelligent here, maybe turn the thermostat off?
        throw new Error("Sensor data out of date");
    }

    let tend = latest_time.toISOString();
    let tstart = latest_time.subtract(15, 'minutes').toISOString();
    return call(sensorDetail, tstart, tend, overview.slug);
}

function* fetchAllDataAndUpdate() {
    try {
        let [ outdoor, indoor, humidity ] = yield call(sensorsOverview);

        /*
         * let uuid_hash = yield select(s => s.device_id);
         * we might also want to GET the thermostat's current state,
         * in case something other than our app changes it.
         */

        let _indoor_temp_series = (yield getSensorSeries(indoor)).data_points;
        let _outdoor_temp_series = (yield getSensorSeries(outdoor)).data_points;

        let [indoor_temp_series, outdoor_temp_series] =
            [_indoor_temp_series, _outdoor_temp_series]
                .map(s => s.map(x => Number(x.value)));

        console.log('indoor_temp_series:', indoor_temp_series)

        if (indoor_temp_series.length < 3 || outdoor_temp_series.length < 3) {
            // should we retry here? Alert the user somehow? Log it for now.
            throw new Error("Not enough sensor data from API");
        }

        let indoor_temp = average(indoor_temp_series);
        let outdoor_temp = average(outdoor_temp_series);

        console.log('humidity:', humidity);
        console.log('temp:', indoor_temp);
        console.log('outdoor temp:', outdoor_temp);

        yield putResolve(sensorsUpdate({
            temperature: indoor_temp,
            outside_temperature: outdoor_temp,
            humidity: Number(humidity.latest_value)
        }));
        yield* saveState();
    } catch (e) {
        console.error(e);
    }
}

function* pollApis() {
    while (true) {
        yield* fetchAllDataAndUpdate();
        yield delay(api_poll_interval_seconds * 1000);
    }
    // load sensors overview - for displaying humidity ✓
    // get endpoint names from initial request data
    // load thermostat/hash to get current state (in case an outside source
    // changed this)
    // get latest three values from sensors api
    // - note that in a real scenario we should check if the latest data
    // is more than 10 minutes old and warn the user
}

function* thermostatSaga() {
    yield* storageInitialization();
    yield* maybeRegisterDevice();
    yield takeLatest(CHANGE_MODE, changeMode);
    yield takeLatest(SET_TEMP, setTemp);
    yield* pollApis();
}

export default thermostatSaga;
