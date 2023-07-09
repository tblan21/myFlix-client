import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card className="h-100">
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string,
      director: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };