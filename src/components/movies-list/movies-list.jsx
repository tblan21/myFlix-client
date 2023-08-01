import React from 'react';
import { useSelector } from 'redux';
import { MovieCard } from '../movie-card/movie-card';
import { MoviesFilter } from '../movies-filter/movies-filter';
import { Col, Row } from 'react-bootstrap';

export const MoviesList = () => {
    const movies = useSelector((state) => state.movies.list);
    const filter = useSelector((state) => state.movies.filter)
        .trim()
        .toLowerCase();
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(filter)
    );

    return (
        <>
            <Row>
                <MoviesFilter />
            </Row>
            <Row>
                {movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                ) : (
                    filteredMovies.map((movie) => (
                        <Col className="mb-5" key={movie.id} sm={6} md={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};