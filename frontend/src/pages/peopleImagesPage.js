import React from "react";
import { useParams } from 'react-router-dom';
import PeopleImages from "../components/PeopleImages/";
import { getPeople, getPeopleImages } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import PeopleDetailHeader from "../components/headerPeopleDetail";

const PeopleImagesPage = () => {
  const { id } = useParams();
  const { data: images, error, isLoading, isError } = useQuery(
    ["images", { id }],
    getPeopleImages
  );
  const { data: peopleData, isLoading: peopleLoading, isError: peopleError } = useQuery(
    ["people", { id }],
    getPeople
  );

  if (isLoading || peopleLoading) {
    return <Spinner />;
  }

  if (isError || peopleError) {
    return <h1>{error.message}</h1>;
  }

  const people = peopleData;

  return (
    <>
      {images ? (
        <>
          <PeopleDetailHeader people={people} />
          <PeopleImages images={images} />
        </>
      ) : (
        <p>Waiting for people details</p>
      )}
    </>
  );
};


export default PeopleImagesPage;