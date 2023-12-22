import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
  getUpcoming,
  getGenres,
  getMovieCredits,
  getMovieImages,
  getMovie,
  getMovieReviews,
  getTopRated,
} from '../tmdb-api';

const router = express.Router();

/**,
 * @swagger
 * /api/movies:
 *    get:
 *      tags:
 *       - movie
 *      summary: 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
router.get('/', asyncHandler(async (req, res) => {
  let { page = 1, limit = 20 } = req.query; // destructure page and limit and set default values
  [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

  // Parallel execution of counting movies and getting movies using movieModel
  const [total_results, results] = await Promise.all([
      movieModel.estimatedDocumentCount(),
      movieModel.find().limit(limit).skip((page - 1) * limit)
  ]);
  const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

  //construct return Object and insert into response object
  const returnObject = {
      page,
      total_pages,
      total_results,
      results
  };
  res.status(200).json(returnObject);
}));

// Get movie details
/**,
 * @swagger
 * /api/movies/:id:
 *    get:
 *      tags:
 *       - movie
 *      summary: getMovie
 *      operationId: getMovie 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

/**,
 * @swagger
 * /api/movies/tmdb/upcoming:
 *    get:
 *      tags:
 *       - movie
 *      summary: getUpcoming
 *      operationId: getUpcoming 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
  const upcomingMovies = await getUpcoming();
  res.status(200).json(upcomingMovies);
}));

/**,
 * @swagger
 * /api/movies/tmdb/topRated:
 *    get:
 *      tags:
 *       - movie
 *      summary: getTopRated
 *      operationId: getTopRated 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
router.get('/tmdb/topRated', asyncHandler(async (req, res) => {
  const topRatedMovies = await getTopRated();
  res.status(200).json(topRatedMovies);
}));

/**,
 * @swagger
 * /api/movies/tmdb/genres:
 *    get:
 *      tags:
 *       - movie
 *      summary: getGenres
 *      operationId: getGenres 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
  const genres = await getGenres();
  res.status(200).json(genres);
}));

/**,
 * @swagger
 * /api/movies/tmdb/:id:
 *    get:
 *      tags:
 *       - movie
 *      summary: getMovie
 *      operationId: getMovie 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
router.get('/tmdb/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const movieDetail = await getMovie(id);
  res.status(200).json(movieDetail);
}));

/**,
 * @swagger
 * /api/movies/tmdb/:id/movieCredits:
 *    get:
 *      tags:
 *       - movie
 *      summary: movieCredits
 *      operationId: movieCredits 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
router.get('/tmdb/:id/movieCredits', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const movieCredits = await getMovieCredits(id);
  res.status(200).json(movieCredits);
}));

/**,
 * @swagger
 * /api/movies/tmdb/:id/movieImages:
 *    get:
 *      tags:
 *       - movie
 *      summary: movieImages
 *      operationId: movieImages 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
router.get('/tmdb/:id/movieImages', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const movieImages = await getMovieImages(id);
  res.status(200).json(movieImages);
}));

/**,
 * @swagger
 * /api/movies/tmdb/:id/movieReviews:
 *    get:
 *      tags:
 *       - movie
 *      summary: movieReviews
 *      operationId: movieReviews 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
router.get('/tmdb/:id/movieReviews', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const movieReviews = await getMovieReviews(id);
  res.status(200).json(movieReviews);
}));

export default router;