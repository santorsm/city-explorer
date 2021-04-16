import React from 'react';
import axios from 'axios';

import Image from 'react-bootstrap/Image';
// import ListGroup from 'react-bootstrap/ListGroup';
import CitySearch from './CitySearch';
import Weather from './Weather';

import './App.css';
import { Jumbotron } from 'react-bootstrap';
// import { Jumbotron } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       cityData: '',
       searchResults: '',
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

      let weatherResponse =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`);

      // console.log(weatherResponse);
      // console.log(locationiqResponse);
      this.setState({
        cityData: locationiqResponse.data[0],
        dailyWeatherData: weatherResponse.data
      });

    } catch (err) {
    console.log(err);
    this.setState({error: `${err.message}`});
    }
  }  
  
  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <br/>
        <CitySearch handleSearch={this.handleSearch} updateCity={this.updateCity}/>
        
        {this.state.cityData.lat !== undefined ?
        <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=<200>x<200> fluid`}/> : null}
        {/* {this.state.cityData.lat !== undefined ? <ListGroup variant="flush">
          <ListGroup.Item>City:   {this.state.cityData.display_place}</ListGroup.Item>
          <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
          <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>
        </ListGroup> : ''} */}
        <br/>
        {this.state.cityData.lat !== undefined ?
        <Jumbotron>
          <h2>{this.state.cityData.display_name}</h2>
          <br/>
          <h3>Lat: {this.state.cityData.lat}</h3>
          <h3>Long: {this.state.cityData.lon}</h3>
        </Jumbotron>: null}
        {this.state.error ? <h3>{this.state.error}</h3> : null}
        {this.state.dailyWeatherData !== undefined ?
        <Weather dailyWeatherData={this.state.dailyWeatherData}/> : null}
      </>
    )
  }
}

export default App;

