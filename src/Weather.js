import React from 'react';
import WeatherDay from './WeatherDay';
import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {
  render() {
    let weatherList = this.props.dailyWeatherData.map((dailyData, index) => (
       <WeatherDay key={index} day={dailyData} date={dailyData.date} description={dailyData.description} low={dailyData.low} high={dailyData.high} />
     ))
    return (
      <ListGroup>
        {weatherList}
      </ListGroup>
    )
  }
}

export default Weather;