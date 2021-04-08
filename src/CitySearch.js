import React from 'react'

class CitySearch extends React.Component {
  constructor(props) {
    super(props)

    this.textInput = React.createRef();
  }

  handleFormSumbitted = (event) => {
    event.preventDefault();
    this.props.handleSearch(this.textInput.current.value);
  }

  render() {
    return (
      <form onSubmit={this.handleFormSumbitted}>
        <input type="text" ref={this.textInput}/>
        <input type="submit"/>
      </form>
    )
  }
}

export default CitySearch;