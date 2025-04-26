// routes/movieRoutes.js
import express from 'express';
import { addMovie, listMovies,deleteMovie  } from '../controllers/movieController.js';
import { isAuthenticated, isAdmin } from '../middlewares/middlewareAuth.js';
import upload from '../upload.js';

const router = express.Router();

// Route to add a movie with image upload
router.post('/addmovie', isAuthenticated, isAdmin, upload.single('image'), addMovie);

// Route to list all movies
router.get('/movielist', listMovies);

router.delete('/delete/:id', deleteMovie);

export default router;
