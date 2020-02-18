export const STATUS_STANDBY = 'STATUS_STANDBY';
export const STATUS_ON = 'STATUS_STANDBY';

export const MODE_HEAT = 'MODE_HEAT';
export const MODE_COOL = 'MODE_COOL';
export const MODE_AUTO = 'MODE_AUTO';

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
    operating_state: {
        current_status: STATUS_STANDBY,
        current_mode: MODE_HEAT
    },
    /*
     * Since there is no API to tell the thermostat to regulate itself
     * to a desired temperature, we have a desired mode and temperature
     * set by the user, and our interface will actually control the thermostat
     * by setting it's _internal_ mode to one of cool, heat, standby.
     */
    user_set_mode: MODE_AUTO,
    user_set_temperature: 20
};

export default function(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
