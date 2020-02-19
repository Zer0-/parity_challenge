import { takeLatest } from 'redux-saga/effects';
import {
    CHANGE_MODE,
    SET_TEMP
} from './redux/messages';

function* changeMode(newMode) {
    console.log('changeMode saga gen. newMode value:', newMode);
}

function* setTemp(newTemp) {
    console.log('setTemp saga gen. newTemp value:', newTemp);
}

function* thermostatSaga() {
    yield takeLatest(CHANGE_MODE, changeMode);
    yield takeLatest(SET_TEMP, setTemp);
}

export default thermostatSaga;
