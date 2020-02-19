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
    MODE_AUTO
} from '../redux/reducers/thermostat';

const buttonInfo = {
    [MODE_HEAT]: 'Heat',
    [MODE_COOL]: 'Cool',
    [MODE_AUTO]: 'Auto'
};

function ModeSwitch(props) {
    /*
     * How do we hightlight the right button?
     *
     * all secondary unless the current mode matches it
     */
    return (
        <Row className="justify-content-md-center mt-4">
            <Col md="auto">
                <ButtonGroup size="lg">
                    {
                        Object.entries(buttonInfo).map(([mode, txt]) => {
                            let variant =
                                mode === props.currentMode ? 'primary' : 'secondary';
                            return (
                                <Button
                                    key={mode}
                                    variant={variant}
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
    store => ({ currentMode: store.user_set_mode }),
    { changeMode }
)(ModeSwitch);
