import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const [ isFavorite, setIsFavorite ] = useState(false);
  const movie = movies.find((b) => b.id === movieId);
  
  useEffect(() => {
    const isFavorited = user.FavoriteMovies.includes(movieId)
    setIsFavorite(isFavorited)
  }, []);

  const removeFavorite = () => {
    fetch(`https://myflixapiapp-f802ff9592b6.herokuapp.com/${user.Username}/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    }).then((data) => {
      setIsFavorite(false);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  const addToFavorite = () => {
    fetch(`https://myflixapiapp-f802ff9592b6.herokuapp.com/${user.Username}/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    }).then((data) => {
      setIsFavorite(true);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  }

  
  return (
    <Card className="text-white">
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Description: {movie.description}</Card.Text>
        <Card.Text>Director: {movie.director}</Card.Text>
        <Card.Text>Genre: {movie.genre}</Card.Text>
      </Card.Body>

      {isFavorite ? (
        <Button onClick={removeFavorite}>Remove from Favorites</Button>
      ) : (
        <Button onClick={addToFavorite}>Add to favorites</Button>
      )}

      <Link to={"/"}>
        <Button>Back</Button>
      </Link>
    </Card>
  )
  
  };