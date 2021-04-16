import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {
  render() {
    console.log(this.props);
    let showWeatherData = this.props.dailyWeatherData.map((dailyData, index) =>(
      <ListGroup.Item key={index}>{`${dailyData.date}: ${dailyData.description}`}</ListGroup.Item>
    ))
  
    return (
      <ListGroup>
        {showWeatherData}
      </ListGroup>
    )
  }
}

export default Weather;