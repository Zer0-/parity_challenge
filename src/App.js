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

const degC = '\u00b0C';

function App() {
  return (
    <Provider store={store}>
        <Container className="mt-4">
            <Row><Col><h2>Thermostat Demo</h2></Col></Row>
            <Row>
                <Col lg={6}>
                    <Row>
                        <Col>
                            <ValueDisplayBox
                                title="Temperature"
                                sensor="temperature"
                                unit={degC}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ValueDisplayBox
                                title="Outside Temperature"
                                sensor="outside_temperature"
                                unit={degC}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ValueDisplayBox
                                title="Humidity"
                                sensor="humidity"
                                unit="%"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col lg={6}>B</Col>
            </Row>
        </Container>
    </Provider>
  );
}

export default App;
