import React from 'react';
import { Provider } from 'react-redux';
import {
    Container
} from 'react-bootstrap';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
        <Container className="mt-4">
            <h1>Thermostat Demo</h1>
        </Container>
    </Provider>
  );
}

export default App;
