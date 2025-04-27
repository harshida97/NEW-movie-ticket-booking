import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Add this import
import { getReviewsForMovie } from '../../services/ReviewApi';

const ReviewsList = () => {
  const { movieId } = useParams();  // Use useParams to get movieId from URL
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');

  console.log('movieId passed to ReviewsList:', movieId);

  const fetchReviews = async () => {
    if (!movieId) {
      setMessage('No movie ID provided.');
      return;
    }

    try {
      const data = await getReviewsForMovie(movieId);
      setReviews(data);
    } catch (error) {
      setMessage('Error fetching reviews');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      {message && <p>{message}</p>}
      <div>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="p-2 mb-2 border rounded">
              <p>
                <strong>{review?.userId?.name || 'Anonymous'}</strong> rated it{' '}
                <span className="text-yellow-500">{review.rating}/5</span>
              </p>
              <p>{review.reviewText}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsList;
