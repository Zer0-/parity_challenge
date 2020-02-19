import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';

function ValueDisplayBox(props) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <h1>
                    <span>{props.value}</span>
                    <span>{props.unit}</span>
                </h1>
            </Card.Body>
        </Card>
    );
}

ValueDisplayBox.propTypes = {
    title: PropTypes.string,

    //one of 'temperature', 'outside_temperature', 'humidity'
    sensor: PropTypes.string,

    unit: PropTypes.string
};

export default connect(
    (state, ownProps) => ({
        value: state.sensor_values[ownProps.sensor]
    })
)(ValueDisplayBox);
