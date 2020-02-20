import {
    CHANGE_MODE,
    SET_TEMP,
    LOAD_STORE,
    DEVICE_REGISTERED_SUCCESS,
    SENSORS_UPDATE,
    OP_MODE_UPDATE
} from '../messages';

export const MODE_OFF       = 'MODE_OFF';
export const MODE_COOL      = 'MODE_COOL';
export const MODE_HEAT      = 'MODE_HEAT';
export const MODE_AUTO_COOL = 'MODE_AUTO_COOL';
export const MODE_AUTO_HEAT = 'MODE_AUTO_HEAT';
export const MODE_STANDBY   = 'MODE_STANDBY';
export const MODE_AUTO      = 'MODE_AUTO'; // for user set value

const stateMapping = [
    [MODE_OFF, 'off'],
    [MODE_HEAT, 'heat'],
    [MODE_COOL, 'cool'],
    [MODE_AUTO_COOL, 'auto_cool'],
    [MODE_AUTO_HEAT, 'auto_heat'],
    [MODE_STANDBY, 'auto_standby']
];

export const modeToApiVal = stateMapping.reduce(
    (o, [x, y]) => Object.assign(o, {[x]: y}),
    {}
);


export const apiValToMode = stateMapping.reduce(
    (o, [x, y]) => Object.assign(o, {[y]: x}),
    {}
);


/*
 * Thermostat logic functions
 */

export const average = a => a.reduce((i, j) => i + j, 0) / a.length;

//Compute the mode the thermostat should be in given the current state
export function thermostatMode(state) {
    let { temperature, outside_temperature } = state.sensor_values;
    let user_temp = state.user_set_temperature;

    switch (state.user_set_mode) {
        case (MODE_COOL): {
            if (outside_temperature < 0) {
                return MODE_OFF;
            } else {
                return MODE_COOL;
            }
        }
        case (MODE_HEAT): {
            return MODE_HEAT;
        }
        case (MODE_AUTO): {
            if (user_temp > temperature) {
                return MODE_AUTO_HEAT;
            } else if (temperature > user_temp && !disableCooling(state)) {
                return MODE_AUTO_COOL;
            } else {
                return MODE_STANDBY;
            }
        }
        case (MODE_OFF): {
            return MODE_OFF;
        }
        default: {
            console.error("user_set_mode set to illegal state");
            return state.operating_mode;
        }
    }
}

export const disableCooling = state =>
    state.sensor_values.outside_temperature < 0;


/*
 * Redux state and reducer
 */

const initialState = {
    /*
     * This object represents averaged values, not raw api values.
     * All temperature values will be a Number representing deg. celsius
     */
    sensor_values: {
        temperature: null,
        outside_temperature: null,
        humidity: null
    },
    device_id: null,
    /*
     * Since there is no API to tell the thermostat to regulate itself
     * to a desired temperature, we have a desired mode and temperature
     * set by the user, and our interface will actually control the thermostat
     * by setting it's _internal_ mode to one of cool, heat, standby.
     */
    operating_mode: MODE_OFF,
    user_set_mode: MODE_OFF,
    user_set_temperature: 20
};

export default function(state = initialState, action) {
    switch (action.type) {
        case (CHANGE_MODE): {
            let new_mode = action.payload;

            if (new_mode === state.user_set_mode) {
                return state;
            }

            return {
                ...state,
                user_set_mode: new_mode
            }
        }
        case (SET_TEMP): {
            return {
                ...state,
                user_set_temperature: action.payload
            }
        }
        case (LOAD_STORE): {
            return { ...action.payload };
        }
        case (DEVICE_REGISTERED_SUCCESS): {
            return {
                ...state,
                device_id: action.payload.uid_hash,
                operating_mode: apiValToMode[action.payload.state]
            };
        }
        case (SENSORS_UPDATE): {
            return {
                ...state,
                sensor_values: action.payload,
            }
        }
        case (OP_MODE_UPDATE): {
            return {
                ...state,
                operating_mode: action.payload
            }
        }
        default:
            return state;
    }
}
