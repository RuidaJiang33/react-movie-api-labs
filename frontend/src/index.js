import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from './pages/upcomingMoviesPage'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import MustWatchMoviesPage from './pages/mustWatchMoviesPage';
import TopRatedMoviesPage from './pages/topRatedMoviesPage';
import PeoplePage from './pages/peoplePage';
import PeopleDetailsPage from './pages/peopleDetailsPage'
import PeopleImagesPage from './pages/peopleImagesPage'
import LoginPage from './pages/loginPage'
import SignupPage from './pages/signupPage'
// import AuthContextProvider from './contexts/authContext'
// import ProtectedRoutes from "./protectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>     
        <MoviesContextProvider>
          {/* <AuthContextProvider> */}
          {/* <SiteHeader /> */}
            <Routes>
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/mustWatch" element={<MustWatchMoviesPage />} />
              <Route path="/movies/topRated" element={<TopRatedMoviesPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/people/:id/images" element={<PeopleImagesPage />} />
              <Route path="/people/:id" element={<PeopleDetailsPage />} />
              <Route path="/people/page/:page" element={<PeoplePage />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {/* </AuthContextProvider> */}
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);