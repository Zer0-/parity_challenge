export const MODE_HEAT = 'MODE_HEAT';
export const MODE_COOL = 'MODE_COOL';
export const MODE_AUTO = 'MODE_AUTO';
export const MODE_STANDBY = 'MODE_STANDBY';

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
        default:
            return state;
    }
}
