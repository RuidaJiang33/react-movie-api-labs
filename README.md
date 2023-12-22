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
http://localhost:8080/swagger/#/

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

http://localhost:8080/swagger/#/

## Security and Authentication

User related pages, including favourite and mustWatch movies. These pages are protected by routes, so when we try to access them, if we are not logged in, the system redirects us to the login page.

![image-20231222204836344](C:\Users\江睿达\AppData\Roaming\Typora\typora-user-images\image-20231222204836344.png)

## Integrating with React App

I refactored all the APIs that were previously in the front-end `tmdb-api.js`. Now, the application fetches TMDB APIs from the backend, categorizing and registering them into different API classes, such as `backend/api/movies/index.js` and `backend/api/people/index.js`. Finally, through the front-end API class, it receives the APIs sent from the backend to the front-end and saves them into respective classes.

![image-20231222205731927](C:\Users\江睿达\AppData\Roaming\Typora\typora-user-images\image-20231222205731927.png)

![image-20231222205820772](C:\Users\江睿达\AppData\Roaming\Typora\typora-user-images\image-20231222205820772.png)

In this way, I can achieve the effect of having favourite movies in each user by mimicking the post method of the api in users, and store the data into MongoDB.

![image-20231222210153609](C:\Users\江睿达\AppData\Roaming\Typora\typora-user-images\image-20231222210153609.png)

## Independent learning (if relevant)

In order to better show the apis I have created and refactored, and to more clearly show the different types of api requests, such as post and delete, I learned how to use Swagger on my own.