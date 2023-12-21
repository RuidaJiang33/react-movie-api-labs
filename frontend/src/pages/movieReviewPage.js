import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import { useQuery } from "react-query";
import { getMovie } from "../api/movies-api";
import Spinner from '../components/spinner'

const MovieReviewPage = (props) => {
  const location = useLocation();
  const { movie, review } = location.state;
  
  const { data: movieData, error, isLoading, isError } = useQuery(
    ["movie", { id: movie.id }],
    getMovie
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <PageTemplate movie={movieData}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;