# Assignment 2 - Web API.

Name: Ruida Jiang

## Features.
 
 + Refactor user login and register: users' accounts are stored in the MongoDB database. Error messages displayed on frontend when user fail to login or register.
 + User-specific data: The user account has a related list of favourite movies and mustWatch movies. After users log out and then log in again, they can see the movie list they added before.
 + Protected routes: If users didn't log in, they cannot visit some of routes like favourite movies page.
 + Separated Frontend and Backend: Refactor all api in the movies project.Fully integrated, all fetches from frontend app go to web api.
 + New API: New api endpoints are added, including several parameterised URL. Most of additional endpoints fetching from TMDB. New MongoDB collection added along with multiple related endpoints.

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]
// backend activate
cd backend
npm install
npm run dev
// frontend activate
cd frontend
npm install
npm start


## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________
REACT_APP_TMDB_KEY=cb17214755955597a061927d855694b3
FAST_REFRESH=false
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb+srv://RuidaJiang:Yx828282@movies-api.u8xu2i6.mongodb.net/?retryWrites=true&w=majority
SECRET=ilikecake
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies | GET | Gets a list of movies 
- /api/movies/tmdb/{movieid} | GET | Gets a single movie 
- /api/movies/tmdb/upcoming | GET | Gets a list of upcoming movies
- /api/movies/tmdb/topRated | GET | Gets a list of topRated movies
- /api/movies/tmdb/genres | GET | Gets genres of movies
- /api/movies/tmdb/{movieid}/movieCredits | GET | Gets a movie's related actor credits
- /api/movies//tmdb/{movieid}/movieImages | GET | Gets a list of images with the movie
- /api/movies/tmdb/{movieid}/movieReviews | GET | Gets a list of reviews with the movie
- /api/people/tmdb/peopleList/{page} | GET | Gets a list of actors and actresses
- /api/people/tmdb/{peopleId} | GET | Gets a single actor of actress
- /api/people/tmdb/{peopleId}/peopleMovieCredits | GET | Gets a list of movies credits with the actor of actress
- /api/people/tmdb/{peopleId}/peopleImages | GET | Gets a list of images with the actor or actress
- /api/users | GET | Gets all users
- /api/users | POST | Register(Create)/Authenticate User
- /api/users/{userId} | PUT | Update a user
- /api/users/{username}/movies | GET | Gets a list of favourite movieId
- /api/users/


If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app. 