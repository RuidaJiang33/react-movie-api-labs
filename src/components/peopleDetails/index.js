import React from "react";
import Grid from "@mui/material/Grid";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { getPeople, getPeopleMovieCredits } from "../../api/tmdb-api";
import { useQueries } from "react-query";
import Spinner from '../spinner'
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import PeopleDetailHeader from "../headerPeopleDetail";


const PeopleDetails = ({ people, children }) => {
  const results = useQueries([
    { queryKey: ["people", { id: people.id }], queryFn: getPeople },
    { queryKey: ["movieCredit", { id: people.id }], queryFn: getPeopleMovieCredits }
  ]);

  const { data, error, isLoading, isError } = results[0];
  const movieCreditData = results[1]
  const gender = people.gender === 1 ? "Female" : "Male";

  if (isLoading || movieCreditData.isLoading) {
    return <Spinner />;
  }

  if (isError || movieCreditData.isError) {
    return <><h1>{error.message}</h1><h1>{movieCreditData.error.message}</h1></>;
  }
  const image = data.profile_path;
  const movies = movieCreditData.data.cast;
  const itemData = movies.slice(0, 6).map(movie => ({
    img: `${movie.poster_path}`,
    title: movie.title,
    id: movie.id
  }));

  return (
    <>
      <PeopleDetailHeader people={people} />
      <Grid container sx={{ padding: "15px", paddingLeft: "100px", paddingRight: "150px" }}>
        <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageListItem key={image} cols={1}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${image}`}
                alt={image}
              />
            </ImageListItem>
            <Box sx={{ padding: '15px' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Information</Typography>
              <Typography variant="h6" sx={{ marginTop: "1rem" }}>Gender</Typography>
              <Typography variant="p">{gender}</Typography>
              <Typography variant="h6" sx={{ marginTop: "1rem" }}>Birthday</Typography>
              <Typography variant="p">{people.birthday}</Typography>
              <Typography variant="h6" sx={{ marginTop: "1rem" }}>Place of birth</Typography>
              <Typography variant="p">{people.place_of_birth}</Typography>
              <Typography variant="h6" sx={{ marginTop: "1rem" }}>Popularity</Typography>
              <Typography variant="p">{people.popularity}</Typography>
            </Box>
          </div>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ padding: '15px' }}>
            <Typography variant="h4" gutterBottom>
              {people.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Biography
            </Typography>
            <Typography variant="body1" gutterBottom>
              {people.biography}
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ paddingLeft: '15px' }}>Movie Credits</Typography>

          <ImageList sx={{ width: '100%', height: 285, paddingLeft: '15px', overflowX: 'hidden' }} cols={6}>
            {itemData.map((item) => (
              <Link key={item.id} to={`/movies/${item.id}`} style={{ textDecoration: 'none' }}>
                <ImageListItem key={item.img}>
                  <img
                    srcSet={`https://image.tmdb.org/t/p/w500/${item.img}`}
                    src={`https://image.tmdb.org/t/p/w500/${item.img}`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <Typography align="center" color='black'>{item.title}</Typography>
                </ImageListItem>
              </Link>
            ))}
          </ImageList>
          {children}
        </Grid>
      </Grid>
    </>
  );
};
export default PeopleDetails;
