import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CitySearch extends React.Component {
  constructor(props) {
    super(props)

    this.textInput = React.createRef();
  }

  handleFormSumbitted = (event) => {
    event.preventDefault();
    this.props.handleSearch();

  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleFormSumbitted} inline>
          <Form.Label htmlFor="city" srOnly>
            City name
          </Form.Label>
          <Form.Control
            className="mb-2 mr-sm-2"
            id="inlineFormInputName2"
            placeholder="enter city to explore"
            onChange={this.props.updateCity}
          />
          <Button variant="primary" type="submit" className="mb-2">
            Explore!
          </Button>
        </Form>
        <br/>

      </>
    )
  }
}

export default CitySearch;