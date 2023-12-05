import React from "react";
import People from "../peopleCard";
import Grid from "@mui/material/Grid";

const PeopleList = ( {people, action }) => {
  console.log(people)
  let peopleCards = people.map((p) => (
    <Grid key={p.id} item xs={4} sm={4} md={3} lg={3} xl={3}>
      <People people={p} action={action} />
    </Grid>
  ));
  return peopleCards;
};

export default PeopleList;