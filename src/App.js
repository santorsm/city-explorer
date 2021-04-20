import React from 'react';
import axios from 'axios';

import Image from 'react-bootstrap/Image';

import CitySearch from './CitySearch';
import Weather from './Weather';

import './App.css';
import { Jumbotron } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       cityData: '',
       searchResults: '',
       lat: '',
       lon: '',
       error: '',
       dailyWeatherData: []
    };
  }

  updateCity = (event) => {
    this.setState({
      searchResults:event.target.value
    })
  }


  handleSearch = async() => {
    try{
      let locationiqResponse = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchResults}&format=json`);

      console.log('This is my location response', locationiqResponse);
      console.log('This is my location city', locationiqResponse.data[0].display_name);
      console.log('This is my location city lat', locationiqResponse.data[0].lat);
      console.log('This is my location city lon', locationiqResponse.data[0].lon);
      this.setState({
        cityData: locationiqResponse.data[0].display_name,
        lat: locationiqResponse.data[0].lat,
        lon: locationiqResponse.data[0].lon,
      });

      this.cityWeatherForecastData(locationiqResponse.data[0].lat, locationiqResponse.data[0].lon)
      console.log('CITY DATA', this.state.cityData);
    } catch (err) {
      console.log(err);
      this.setState({error: `${err.message}`});
    }
  }  
  cityWeatherForecastData = async (lat, lon) => {
    try{
      
      let weatherResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`,{
        params:{
          lat: lat,
          lon: lon
        }
      });
      console.log('should be weather response', weatherResponse.data);
      console.log('should be lat', this.state.lat);
      this.setState({
        dailyWeatherData: weatherResponse.data
      })
      console.log('This is the one we are looking for:', this.state.dailyWeatherData);
    } catch (err) {
    console.log(err);
    this.setState({error: `${err.message}`});
    }
  }

  render() {
    console.log(this.state);
    console.log(this.state.dailyWeatherData)
    return (
      <>
        <h1>City Explorer</h1>
        <br/>
        <CitySearch handleSearch={this.handleSearch} updateCity={this.updateCity}/>

        <br/>
        {this.state.lat.length !== 0 ?
          <Jumbotron>
          <h2>{this.state.cityData}</h2>
            <br/>
            <h3>Lat: {this.state.lat}</h3>
            <h3>Long: {this.state.lon}</h3>
            <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12&size=<200>x<200> fluid`}/>
          </Jumbotron>: ''}
        {this.state.error ? <h3>{this.state.error}</h3> : ''}
        {this.state.dailyWeatherData !== undefined ?
        <Weather dailyWeatherData={this.state.dailyWeatherData}/> : ''}
      </>
    )
  }
}

export default App;

