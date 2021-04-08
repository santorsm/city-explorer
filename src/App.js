import React from 'react';
import axios from 'axios';

import CitySearch from './CitySearch';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       haveWeSearchedYet: false,
       citySearchedFor: ''
    };
  }

  handleShowSearch = () => {
    this.setState({haveWeSearchedYet: false});
  }

  handleSearch = async(citySearchedFor) => {
    console.log('searched',citySearchedFor);
    this.setState({
      haveWeSearchedYet: true,
      citySearchedFor: citySearchedFor
    });
    let locationiqResponse = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${citySearchedFor}=json`);
    console.log(locationiqResponse);

  }
  
  render() {
    return (
      <>
        <h1>City Explorer</h1>
        {this.state.haveWeSearchedYet ? <button onClick={this.handleShowSearch}>Search Again</button> : <CitySearch handleSearch={this.handleSearch} />}
      </>
    )
  }
}

export default App;

