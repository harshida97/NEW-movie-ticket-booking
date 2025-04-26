// routes/reviewRoutes.js
import express from 'express';
import { addReview, getReviewsForMovie,getAverageRating } from '../controllers/reviewController.js';
import { isAuthenticated } from '../middlewares/middlewareAuth.js'; // Assuming you have a middleware to check JWT token

const router = express.Router();

// Add a review
router.post('/add', isAuthenticated, addReview);

// Get reviews for a movie
router.get('/movie/:movieId', getReviewsForMovie);

router.get('/average/:movieId', getAverageRating);

export default router;
