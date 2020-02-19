import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    Badge
} from 'react-bootstrap';
/*
import {
    MODE_STANDBY
} from '../redux/reducers/thermostat';
*/

export const STATUS_VALUES = [ "Standby", "On"]; 
export const MODE_VALUES = [ "Heat", "Cool"]; 

/*
 * The logic to display the lights will be shared
 * by our application logic that will send signals
 * to the thermostat.
 */
export function getStatusValueIdx(store) {
    //TODO
    return 0;
}

export function getModeValueIdx(store) {
    return 1;
}

function IndicatorLight(props) {
    console.log('IndicatorLight');
    let onIdx = props.onValIdx;
    return (
        <Row className="mt-4 flex-nowrap">
            <Col sm={4}><h4>{props.label}</h4></Col>
            {
                props.values.map((val, i) => {
                    let variant = onIdx == i ? 'success' : 'secondary';

                    return (
                        <Col sm={4} key={i}>
                            <Row className="justify-content-md-center">
                                <Badge
                                    className="indicatorLight"
                                    variant={variant}
                                >
                                    <span></span>
                                </Badge>
                            </Row>
                            <Row className="justify-content-md-center">
                                {val}
                            </Row>
                        </Col>
                    );
                })
            }
        </Row>
    );
}

IndicatorLight.propTypes = {
    label: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,

    /*
     * This function should take our program state (the store)
     * and return an integer index of one of the values (above)
     * (this is how the component decides whether the light is on or not)
     *
     * You can use the supplied functions and values exported from
     * this module.
     */
    opStateToOption: PropTypes.func.isRequired
}

export default connect(
    (state, ownProps) => ({
        onValIdx: ownProps.opStateToOption(state)
    })
)(IndicatorLight);
