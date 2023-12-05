import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid } from "@mui/material";

const PeopleImages = (images) => {

  const images_6 = images.images.profiles.slice(0, 6);

  return (
    <>
      <Grid sx={{
        display: 'grid',
        placeItems: 'center'
      }}>
        <ImageList sx={{
          width: '100%',
          height: 400,
          padding: '15px',
          overflowX: 'hidden'
        }} cols={6}>
          {images_6.map((image) => (
            <ImageListItem key={image.file_path}>
              <img
                srcSet={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                alt=''
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </>
  )
}

export default PeopleImages;