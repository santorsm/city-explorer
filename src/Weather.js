import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {
  render() {
    return (
      <ListGroup>
        {this.props.dailyWeatherData.map((dailyData, index) =>(
          <ListGroup.Item key={index} day={dailyData}>{`${dailyData.date}: ${dailyData.description} -- Low: ${dailyData.low}F | High: ${dailyData.high}F`}</ListGroup.Item>
        ))}
      </ListGroup>
    )
  }
}

export default Weather;