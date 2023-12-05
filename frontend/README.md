# Assignment 1 - ReactJS app.

Name: Ruida Jiang

## Overview.
Extend the App: 
    New static and parameterised endpoints.
    Movie details contains links to actors and actor details links to movies.
Extend the functionality:
    Caching with react-query is done on all static and parameterised endpoints
    New filtering - peopleFliter is added
Additional features:
    Refactor siteHeader component with Menu and MenuItem
    Add several new features (pagination and authentication with Firebase)

### Features.
+ Refactor siteHeader component: 
    Use Menu and MenuItem from materialUI to display a list of choices on a temporary surface and Use useNavigate to navigate to different addresses(/home, /movies/favorites, /movies/upcoming....)
+ New endpoints: 
    Add new static endpoints from TMDB including /movies/mustWatch, /movies/topRated; Parameterised endpoints including /people/:id/images, /people/:id, /people/page/:page
    User can visit people pages to get information of popular actors and actresses (/people/page/:page); User can also search different names of people to get relative results. (filterPeople)
    When user click photos at peoplecards will enter people detail page (/people/:id), which show detail information of specific information including movie credits. In that page, user can click photos of movies to enter movies detail pages. 
    User can click 'MEDIA' link in people detail headers to watch more actors' or actress' photos (/people/:id/images)
+ Authentication by firebase
    When user visit the web app, they will visit login page first; User can login, signup and logout with firebase authentication.

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API endpoints.

+ Get a list of people ordered by popularity - person/popular
+ Query the top level details of a person - person/${id}
+ Get the profile images that belong to a person - person/${id}/images
+ Get the movie credits for a person - person/${id}/movie_credits
+ Get the people credits for a movie - movie/${id}/credits
+ Get a list of movies ordered by rating - movie/top_rated

## Routing.

+ /movies/topRated - displays list of top rated movies（protected）
+ /people/page/:page - displays list of people（protected）
+ /people/:id - people details including movie credits（protected）
+ /people/:id/images - images of specific person（protected）
+ / - login by email and password (public)
+ /signup - signup a new account by email and password (public)

## Independent learning (If relevant).

I read the output result of the corresponding api on TMDB, and then selected the required api after comparison; Then I read the document on the official website of materialUI, learned the usage of Menu, Paper, Card and other components, and applied them to my project.
To research Firebase certification, I looked at the official Firebase documentation and watched some tutorials, including some on YouTube.