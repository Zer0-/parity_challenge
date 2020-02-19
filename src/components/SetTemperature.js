import React from 'react';
import { connect } from 'react-redux';
import { setTemp } from '../redux/messages';
import {
    Row,
    Col,
    InputGroup,
    FormControl
} from 'react-bootstrap';

const min_allowed_temp = 0;
const max_allowed_temp = 40;
const step = 0.5;

function validateTemp(callback, new_temp) {
    new_temp = Number(new_temp);

    if (new_temp) {
        let callbackTemp =
            Math.min(Math.max(min_allowed_temp, new_temp), max_allowed_temp);
        callback(callbackTemp);
    }
}

function SetTemperature(props) {
    return (
        <Row className="justify-content-md-center mt-4">
            <Col md="auto" className="mb-4 mt-4 setTemp">
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Temperature</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type="number"
                        value={props.currentTemp}
                        onChange={t => validateTemp(props.setTemp, t.target.value)}
                        size="lg"
                        min="0"
                        step={step}
                    />
                </InputGroup>
            </Col>
        </Row>
    );
}

export default connect(
    store => ({ currentTemp: store.user_set_temperature }),
    { setTemp }
)(SetTemperature);
