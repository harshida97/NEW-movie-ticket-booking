// controllers/reviewController.js
import Review from '../models/reviewModel.js'

// Add a review
export const addReview = async (req, res) => {
    const { movieId, rating, reviewText } = req.body;

    if (!movieId || !rating || !reviewText) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newReview = new Review({
            movieId,
            userId: req.user._id, // Assuming you're passing the user from the authentication middleware
            rating,
            reviewText
        });

        await newReview.save();

        res.status(200).json({ success: true, message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding review' });
    }
};

// Get reviews for a movie
export const getReviewsForMovie = async (req, res) => {
    try {
        const reviews = await Review.find({ movieId: req.params.movieId }).populate('userId', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reviews' });
    }
};



// Get average rating for a movie
export const getAverageRating = async (req, res) => {
    const { movieId } = req.params;
  
    try {
      const reviews = await Review.find({ movieId });
  
      if (reviews.length === 0) {
        return res.status(200).json({ averageRating: 0 });
      }
  
      const total = reviews.reduce((sum, r) => sum + r.rating, 0);
      const average = total / reviews.length;
  
      res.status(200).json({ averageRating: average.toFixed(1) });
    } catch (error) {
      res.status(500).json({ error: 'Error calculating average rating' });
    }
  };
  