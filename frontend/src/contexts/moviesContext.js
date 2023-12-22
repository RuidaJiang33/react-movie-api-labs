import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import {
  getFavouriteMovies,
  getMustWatchMovies,
  addFavouriteMovies,
  addMustWatchMovies,
  removeFavouriteMovies,
  removeMustWatchMovies
} from '../api/movies-api';

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([])
  const [mustWatches, setMustWatches] = useState([])
  const { isAuthenticated, userName } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      setFavorites([]);
      setMustWatches([])
    } else {
      async function fetchData() {
        setFavorites(await getFavouriteMovies(userName));
        setMustWatches(await getMustWatchMovies(userName));
      }
      fetchData();
    }
  }, [isAuthenticated, userName]);

  const addToFavorites = async (movie) => {
    let newFavorites = [];
    if (isAuthenticated) {
      newFavorites = await getFavouriteMovies(userName)
    }
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
      await addFavouriteMovies(userName, movie);
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const addToMustWatches = async (movie) => {
    let newMustWatches = [];
    if (isAuthenticated) {

      newMustWatches = await getMustWatchMovies(userName)
    }
    if (!mustWatches.includes(movie.id)) {
      newMustWatches = [...mustWatches, movie.id];
      await addMustWatchMovies(userName, movie);
    }
    else {
      newMustWatches = [...mustWatches];
    }

    setMustWatches(newMustWatches)
  };

  // We will use this function in a later section
  const removeFromFavorites = async (movie) => {
    setFavorites(favorites.filter(
      (mId) => mId !== movie.id
    ))
    await removeFavouriteMovies(userName, movie);
  };

  const removeFromMustWatches = async (movie) => {
    setMustWatches(mustWatches.filter(
      (mId) => mId !== movie.id
    ))
    await removeMustWatchMovies(userName, movie);
  };

  const [myReviews, setMyReviews] = useState({})

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatches,
        addToFavorites,
        addToMustWatches,
        removeFromFavorites,
        removeFromMustWatches,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;