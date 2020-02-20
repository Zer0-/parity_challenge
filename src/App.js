import React from 'react';
import { Provider } from 'react-redux';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import store from './redux/store';
import './App.css';
import ValueDisplayBox from './components/ValueDisplayBox';
import IndicatorLight from './components/IndicatorLight';
import {
    STATUS_VALUES,
    MODE_VALUES,
    getStatusValueIdx,
    getModeValueIdx
} from './components/IndicatorLight';
import ModeSwitch from './components/ModeSwitch';
import SetTemperature from './components/SetTemperature';

const degC = '\u00b0C';

function App() {
  return (
    <Provider store={store}>
        <Container className="mt-4">
            <Row><Col><h2>Thermostat Demo</h2></Col></Row>
            <Row>
                <Col lg={6}>
                    <Row className="mb-1">
                        <Col>
                            <ValueDisplayBox
                                title="Temperature"
                                sensor="temperature"
                                unit={degC}
                                precision={1}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col>
                            <ValueDisplayBox
                                title="Outside Temperature"
                                sensor="outside_temperature"
                                unit={degC}
                                precision={1}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ValueDisplayBox
                                title="Humidity"
                                sensor="humidity"
                                unit="%"
                                precision={0}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col lg={6}>
                    <IndicatorLight
                        label="Status"
                        values={STATUS_VALUES}
                        opStateToOption={getStatusValueIdx}
                    />
                    <hr/>
                    <IndicatorLight
                        label="Current Mode"
                        values={MODE_VALUES}
                        opStateToOption={getModeValueIdx}
                    />
                    <SetTemperature/>
                    <ModeSwitch/>
                </Col>
            </Row>
        </Container>
    </Provider>
  );
}

export default App;
