import React from 'react';
import { connect } from 'react-redux';
import { changeMode } from '../redux/messages';
import {
    Row,
    Col,
    Button,
    ButtonGroup
} from 'react-bootstrap';
import {
    MODE_HEAT,
    MODE_COOL,
    MODE_AUTO,
    MODE_OFF,
    disableCooling
} from '../redux/reducers/thermostat';

const buttonInfo = {
    [MODE_COOL]: 'Cool',
    [MODE_HEAT]: 'Heat',
    [MODE_AUTO]: 'Auto',
    [MODE_OFF]: 'Off'
};

function ModeSwitch(props) {
    return (
        <Row className="justify-content-md-center mt-4">
            <Col md="auto" className="mb-4 mt-4">
                <ButtonGroup size="lg">
                    {
                        Object.entries(buttonInfo).map(([mode, txt]) => {
                            let variant, handler;

                            if (mode === props.currentMode) {
                                variant = 'primary';
                                handler = null;
                            } else {
                                variant = 'secondary';
                                handler = props.changeMode.bind(this, mode);
                            }
                            let disabled =
                                mode === MODE_COOL && props.cool_disabled;
                            return (
                                <Button
                                    disabled={disabled}
                                    key={mode}
                                    variant={variant}
                                    onClick={handler}
                                >{txt}</Button>
                            );
                        })
                    }
                </ButtonGroup>
            </Col>
        </Row>
    );
}

export default connect(
    store => ({
        currentMode: store.user_set_mode,
        cool_disabled: disableCooling(store)
    }),
    { changeMode }
)(ModeSwitch);
