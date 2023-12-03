import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

const AddToMustWatchesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToMustWatches = (e) => {
    e.preventDefault();
    context.addToMustWatches(movie);
  };

  return (
    <IconButton aria-label="add to mustWatches" onClick={handleAddToMustWatches}>
      <PlaylistAddIcon />
    </IconButton>
  );
}

export default AddToMustWatchesIcon;