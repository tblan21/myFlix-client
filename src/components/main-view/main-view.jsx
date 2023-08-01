import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  const [token, setToken] = useState(storedToken);

  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const movies = useSelector((state) => {
    return state.movies.list;
  });

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixapiapp-f802ff9592b6.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            title: movie.Title,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
            description: movie.Description
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar 
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        />
        <Row className="justify-content-md-center">
          <Routes>

            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />

            <Route  
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user) =>
                        setUser(user)} 
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col>
                      <ProfileView
                        user={user}
                        token={token}
                        setUser={setUser}
                        movies={movies}
                        onLogout={onLogout}
                      />
                    </Col>
                  )}
                </>
              }
            />
            
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty.</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView 
                        movies={movies} 
                        user={user}
                        setUser={setUser}
                        token={token}
                        />
                    </Col>
                  )}
                </>
              }
            />

            <Route  
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty.</Col>
                  ) : ( 
                    <>
                      {movies.map((movie) => (
                          <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
    </BrowserRouter>
  );
};