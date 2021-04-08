import React from 'react';

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

  handleSearch = (citySearchedFor) => {
    console.log('searched',citySearchedFor);
    this.setState({
      haveWeSearchedYet: true,
      citySearchedFor: citySearchedFor
    })
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

