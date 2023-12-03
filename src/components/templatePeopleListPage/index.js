import React, { useState } from "react";
import PeopleList from "../peopleList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FilterCard from "../filterPeople";

function PeopleListPageTemplate({ people, action }) {

  const [nameFilter, setNameFilter] = useState("");

  let displayedPeople = people
    .filter((p) => {
      return p.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
  };

  return (
    <>
      <Grid container sx={{ padding: '20px' }}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" sx={{ paddingBottom: '15px', fontWeight: 'bold' }}>
            Popular People
            <FilterCard
              onUserInput={handleChange}
              titleFilter={nameFilter}
            />
          </Typography>
        </Grid>
        <Grid item container spacing={3}>
          <PeopleList action={action} people={displayedPeople} />
        </Grid>
      </Grid>
    </>
  );
}

export default PeopleListPageTemplate;