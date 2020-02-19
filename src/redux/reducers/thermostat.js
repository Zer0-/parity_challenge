import {
    CHANGE_MODE,
    SET_TEMP,
    LOAD_STORE,
    DEVICE_REGISTERED_SUCCESS
} from '../messages';

export const MODE_HEAT = 'MODE_HEAT';
export const MODE_COOL = 'MODE_COOL';
export const MODE_AUTO = 'MODE_AUTO';
export const MODE_STANDBY = 'MODE_STANDBY';

const stateMapping = [
    [MODE_HEAT, 'heat'],
    [MODE_COOL, 'cool'],
    [MODE_STANDBY, 'auto_standby']
];

export const modeToApiVal = stateMapping.reduce(
    (o, [x, y]) => Object.assign(o, {[x]: y}),
    {});


export const apiValToMode = stateMapping.reduce(
    (o, [x, y]) => Object.assign(o, {[y]: x}),
    {});

const initialState = {
    /*
     * This object represents averaged values, not raw api values.
     * All temperature values will be a Number representing deg. celsius
     */
    /*
    sensor_values: {
        temperature: null,
        outside_temperature: null,
        humidity: null
    },
    */
    sensor_values: {
        temperature: 24,
        outside_temperature: -1,
        humidity: 10
    },
    device_id: null,
    /*
     * Since there is no API to tell the thermostat to regulate itself
     * to a desired temperature, we have a desired mode and temperature
     * set by the user, and our interface will actually control the thermostat
     * by setting it's _internal_ mode to one of cool, heat, standby.
     */
    operating_mode: MODE_STANDBY,
    user_set_mode: MODE_AUTO,
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
            let newState = {
                ...state,
                device_id: action.payload.uid_hash,
                operating_mode: apiValToMode[action.payload.state]
            };
            console.log(action.payload);
            console.log("DEVICE_REGISTERED_SUCCESS, newState:", newState);
            return newState;
        }
        default:
            return state;
    }
}
