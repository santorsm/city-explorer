import React from 'react';

import Card from 'react-bootstrap/Card';

class Movies extends React.Component {
  render() {
    return (

    <>
      {this.props.cityMovieData.map((movie, index) =>(
      <Card key={index} style={{ width: '18rem' }}>
          <Card.Img  variant="top" src= {movie.image_url} />
          <Card.Body>
            <Card.Title>{`${movie.title}`}</Card.Title>
            <Card.Text>
            {`${movie.overview}`}
            </Card.Text>
          </Card.Body>
      </Card>
        ))}
    </>
    )
  }
}

export default Movies;