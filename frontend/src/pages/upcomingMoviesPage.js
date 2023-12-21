import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcoming } from "../api/movies-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToMustWatchesIcon from '../components/cardIcons/addToMustWatches'

const UpcomingMoviesPage = () => {

  const { data, error, isLoading, isError } = useQuery('upcoming', getUpcoming)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToMustWatchesIcon movie={movie} />          
      }}
    />
  );
};

export default UpcomingMoviesPage;