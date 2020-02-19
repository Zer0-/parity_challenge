import React from 'react';
import { connect } from 'react-redux';
import { setTemp } from '../redux/messages';
import {
    Row,
    Col,
    InputGroup,
    FormControl
} from 'react-bootstrap';

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
                        onChange={t => props.setTemp(t.target.value)}
                        size="lg"
                        min="0"
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
