import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

class WeatherDay extends React.Component {
  render() {
    return (
          <ListGroup.Item>{`${this.props.date}: ${this.props.description} -- Low: ${this.props.low}F | High: ${this.props.high}F`}</ListGroup.Item>
        );

  }
}

export default WeatherDay;