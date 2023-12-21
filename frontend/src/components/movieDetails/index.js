import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { useQueries } from "react-query";
import { getMovie, getMovieCredits } from "../../api/movies-api";
import Spinner from '../spinner';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";


const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);
  const results = useQueries([
    { queryKey: ["movie", { id: movie.id }], queryFn: getMovie },
    { queryKey: ["Credit", { id: movie.id }], queryFn: getMovieCredits }
  ]);

  const { data, error, isLoading, isError } = results[0];
  const CreditData = results[1]

  if (isLoading || CreditData.isLoading) {
    return <Spinner />;
  }

  if (isError || CreditData.isError) {
    return <><h1>{error.message}</h1><h1>{CreditData.error.message}</h1></>;
  }
  const people = CreditData.data.cast;
  const itemData = people.slice(0, 6).map(p => ({
    img: `${p.profile_path}`,
    name: p.name,
    id: p.id
  }));

  return (
    <>
      <Grid>
        <Typography variant="h5" component="h3">
          Overview
        </Typography>

        <Typography variant="h6" component="p">
          {movie.overview}
        </Typography>

        <Paper
          component="ul"
          sx={{ ...root }}
        >
          <li>
            <Chip label="Genres" sx={{ ...chip }} color="primary" />
          </li>
          {movie.genres.map((g) => (
            <li key={g.name}>
              <Chip label={g.name} sx={{ ...chip }} />
            </li>
          ))}
        </Paper>
        <Paper component="ul" sx={{ ...root }}>
          <Chip key="runtime" icon={<AccessTimeIcon />} label={`${data.runtime} min.`} />
          <Chip key="revenue" icon={<MonetizationIcon />} label={`${data.revenue.toLocaleString()}`} />
          <Chip key="vote" icon={<StarRate />} label={`${data.vote_average} (${data.vote_count})`} />
          <Chip key="releaseDate" label={`Released: ${data.release_date}`} />
        </Paper>
        <Paper component="ul" sx={{ ...root }}>
          <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
          {movie.production_countries.map((pc, index) => (
            <Chip key={`productionCountry${index}`} label={pc.name} sx={{ ...chip }} />
          ))}
        </Paper>
        <Typography variant="h5" sx={{paddingTop: 5}}>Credits</Typography>
        <ImageList sx={{ width: '100%', height: 300, overflowX: 'hidden' }} cols={6}>
          {itemData.map((item) => (
            <Link key={item.id} to={`/people/${item.id}`} style={{ textDecoration: 'none' }}>
              <ImageListItem key={item.img}>
                <img
                  srcSet={`https://image.tmdb.org/t/p/w500/${item.img}`}
                  src={`https://image.tmdb.org/t/p/w500/${item.img}`}
                  alt={item.title}
                  loading="lazy"
                />
                <Typography align="center" color='black'>{item.name}</Typography>
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      </Grid>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};
export default MovieDetails;