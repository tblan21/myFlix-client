import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Office Space",
      description: "Three company workers who hate their jobs decide to rebel against their greedy boss.",
      genre: "Comedy",
      director: "Mike Judge"  
    },
    {
        id: 2,
        title: "Spirited Away",
        description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, a world where humans are changed into beasts.",
        genre: "Fantasy",
        director: "Hayao Miyazaki"  
    },
    {
        id: 3,
        title: "The Birdcage",
        description: "A gay cabaret owner and his drag queen companion agree to put up a false straight front so that their son can introduce them to his fiancée's right-wing moralistic parents.",
        genre: "Comedy",
        director: "Mike Nichols"
    }    
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};