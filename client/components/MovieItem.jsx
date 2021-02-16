import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RemoveMovieModal from '@app/modals/RemoveMovieModal';
import { connect } from 'react-redux';
import { fetchMovies } from '@app/store/movies';

//images
import MovieCover from '@app/assets/images/gatsy_movie.jpeg';

class MovieItem extends React.Component {
  RemovingMovieModal = React.createRef();

  render() {
    const { format, releaseYear, title, stars } = this.props;

    return (
      <div className="movie col-10 col-sm-4 col-lg-3">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={MovieCover} />
          <div className="movieRemove"></div>
          <Card.Body>
            <div className="movieTopContent">
              <Card.Title>{title}</Card.Title>
              <p className="movieYear">{releaseYear}</p>
              <p className="movieStars">
                {stars.map((star, idx) => (
                  <a href={`https://www.google.com/search?q=${star}`} target="_blank" key={idx}>
                    {star}
                  </a>
                ))}
              </p>
              <Card.Text>Some quite short movie description. It's really cool movie!</Card.Text>
            </div>
            <div>
              <p className="text-right mb-2">{format}</p>
              <Button variant="outline-warning" className="w-100 mb-2">
                Add to cart
              </Button>
              <Button
                variant="dark"
                className="w-100"
                onClick={() => this.RemovingMovieModal.current.open(this.props)}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
        <RemoveMovieModal ref={this.RemovingMovieModal} onDone={() => this.props.fetchMovies()} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies.list,
});

const mapDispatchToActions = {
  fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToActions)(MovieItem);
