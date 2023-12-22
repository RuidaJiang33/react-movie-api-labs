import express from 'express';
import User from './userModel';
import Movie from '../movies/movieModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

async function registerUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        await User.create(req.body);
        res.status(201).json({success: true, msg: 'User successfully created.'});
    } else {
        res.status(401).json({success: false, msg: 'User existed!'});
    }
}

async function authenticateUser(req, res) {
  const user = await User.findByUserName(req.body.username);
  if (!user) {
      return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
      const token = jwt.sign({ username: user.username }, process.env.SECRET);
      res.status(200).json({ success: true, token: 'BEARER ' + token });
  } else {
      res.status(401).json({ success: false, msg: 'Wrong password.' });
  }
}

// Get all users
/**,
 * @swagger
 * /api/users:
 *    get:
 *      tags:
 *       - users
 *      summary: 
 *      operationId: 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// register(Create)/Authenticate User
/**,
 * @swagger
 * /api/users:
 *    post:
 *      tags:
 *       - users
 *      summary: register
 *      operationId: 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
router.post('/', asyncHandler(async (req, res) => {
  try {
      if (!req.body.username || !req.body.password) {
          return res.status(400).json({ success: false, msg: 'Username and password are required.' });
      }
      if (req.query.action === 'register') {
          await registerUser(req, res);
      } else {
          await authenticateUser(req, res);
      }
  } catch (error) {
      // Log the error and return a generic error message
      console.error(error);
      res.status(500).json({ success: false, msg: 'Internal server error.' });
  }
}));

// Update a user
// register(Create)/Authenticate User
/**,
 * @swagger
 * /api/users/:id:
 *    put:
 *      tags:
 *       - users
 *      summary: Update a user
 *      operationId: 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
router.put('/:id', async (req, res) => {
  if (req.body._id) delete req.body._id;
  const result = await User.updateOne({
      _id: req.params.id,
  }, req.body);
  if (result.matchedCount) {
      res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
  } else {
      res.status(404).json({ code: 404, msg: 'Unable to Update User' });
  }
});

/**,
 * @swagger
 * /api/users/:username/movies:
 *    get:
 *      tags:
 *       - users
 *      summary: 
 *      operationId: 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: Gets a list of favourite movieId
 * */
router.get('/:username/movies', async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.findOne({username}).select('favouriteMovies');
        res.status(200).json(user.favouriteMovies);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving favourite movies'});
    }
});

/**,
 * @swagger
 * /api/users/:username/mustWatch:
 *    get:
 *      tags:
 *       - users
 *      summary: 
 *      operationId: 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: Gets a list of mustWatch movieId
 * */
router.get('/:username/mustWatch', async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.findOne({username}).select('mustWatchMovies');
        res.status(200).json(user.mustWatchMovies);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving mustWatch movies'});
    }
});

/**,
 * @swagger
 * /api/users/movies:
 *    post:
 *      tags:
 *       - users
 *      summary: 
 *      operationId: 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: post favourite movieId
 * */
router.post('/movies', asyncHandler(async (req, res) => {
    const userName = req.body.username;
    const movieId = req.body.movieId;

    try {
        await User.findOneAndUpdate(
            {username: userName}, 
            {$addToSet: {favouriteMovies: movieId}}, 
            {new: true}
        );
        res.status(200).json({message: 'Favourite movie added successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error adding favourite movie'});
    }
  }));

  /**,
 * @swagger
 * /api/users/mustWatch:
 *    post:
 *      tags:
 *       - users
 *      summary: 
 *      operationId: 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: post mustWatch movieId
 * */
  router.post('/mustWatch', asyncHandler(async (req, res) => {
    const userName = req.body.username;
    const movieId = req.body.movieId;

    try {
        await User.findOneAndUpdate(
            {username: userName}, 
            {$addToSet: {mustWatchMovies: movieId}}, 
            {new: true}
        );
        res.status(200).json({message: 'MustWatch movie added successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error adding mustWatch movie'});
    }
  }));

  /**,
 * @swagger
 * /api/users/movies:
 *    delete:
 *      tags:
 *       - users
 *      summary: 
 *      operationId: 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: delete favourite movieId
 * */
  router.delete('/movies', async (req, res) => {
    const userName = req.body.username;
    const movieId = req.body.movieId;

    try {
        await User.findOneAndUpdate(
            {username: userName},
            {$pull: {favouriteMovies: movieId}},
            {new: true}
        );
        res.status(200).json({message: 'Favourite movie removed successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error removing favourite movie'});
    }
});

  /**,
 * @swagger
 * /api/users/mustWatch:
 *    delete:
 *      tags:
 *       - users
 *      summary: 
 *      operationId: 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: delete mustWatch movieId
 * */
router.delete('/mustWatch', async (req, res) => {
    const userName = req.body.username;
    const movieId = req.body.movieId;

    try {
        await User.findOneAndUpdate(
            {username: userName},
            {$pull: {mustWatchMovies: movieId}},
            {new: true}
        );
        res.status(200).json({message: 'MustWatch movie removed successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error removing mustWatch movie'});
    }
});

export default router;