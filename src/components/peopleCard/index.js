import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import img from '../../images/film-poster-placeholder.png'
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";

export default function PeopleCard({ people, action }) {
  return (
    <>
      <Card sx={{ maxWidth: 500 }}>

        <CardActionArea>
          <Link to={`/people/${people.id}`}>
            <CardMedia
              component="img"
              height="300"
              image={
                people.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${people.profile_path}`
                  : img
              }
              alt="green iguana"
            />
          </Link>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {people.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {people.known_for[0].title}
            </Typography>
          </CardContent>
        </CardActionArea>


      </Card>
    </>
  )
}