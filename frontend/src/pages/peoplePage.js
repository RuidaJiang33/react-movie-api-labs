import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getPeopleList } from "../api/people-api";
import PageTemplate from '../components/templatePeopleListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { Pagination } from '@mui/material';
import { Grid } from '@mui/material';


const PeoplePage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = Number(queryParams.get('page')) || 1;

  const { data, error, isLoading, isError, refetch } = useQuery(['people', { page }], getPeopleList)

  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = 10;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    refetch({ page: newPage });
    navigate(`/people/page/${newPage}`);
  };

  const Paginator = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
      />
    );
  };

  useEffect(() => {
    if (!page) {
      navigate('/people/page/1');
    }
  }, [page, navigate]);

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }

  const people = data.results;

  return (
    <>
      <PageTemplate
        title="Popular People"
        people={people}
      />
      <Grid container justifyContent="center">
        <Grid item>
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default PeoplePage;
