import React from 'react';
import axios from 'axios';

import Image from 'react-bootstrap/Image';

import CitySearch from './CitySearch';
import Weather from './Weather';
import Movies from './Movies';

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
       dailyWeatherData: [],
       cityMovieData: []
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

      this.setState({
        cityData: locationiqResponse.data[0].display_name,
        lat: locationiqResponse.data[0].lat,
        lon: locationiqResponse.data[0].lon,
      });

      this.cityWeatherForecastData(locationiqResponse.data[0].lat, locationiqResponse.data[0].lon)

      console.log('Data for city >>>>>>', this.state.searchResults);
      this.cityMovieData(this.state.searchResults);

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

      this.setState({
        dailyWeatherData: weatherResponse.data
      })

    } catch (err) {
    console.log(err);
    this.setState({error: `${err.message}`});
    }
  }

  cityMovieData = async (searchResults) => {
    try{
      const cityMovieData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies`,{
          params:{
            city: this.state.searchResults
          }
        });
      console.log(cityMovieData);
      this.setState({
        cityMovieData: cityMovieData.data
      });
    } catch (error) {
      this.setState({error: error.message});
    }
  } 
  render() {

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
        {this.state.dailyWeatherData !== undefined ?
        <Movies cityMovieData={this.state.cityMovieData}/> : ''}
      </>
    )
  }
}

export default App;

