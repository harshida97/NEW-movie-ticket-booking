import React, { useState } from 'react';
import { addReview } from '../../services/ReviewApi';

const ReviewForm = ({ movieId, onReviewSubmitted, onCancel }) => {
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addReview({ movieId, rating, reviewText });
      setMessage('Review submitted successfully');
      setRating(1);
      setReviewText('');
      onReviewSubmitted(); // Refresh the list / close the form
    } catch (error) {
      setMessage('Error submitting review');
    }
  };

  const handleCancel = () => {
    setRating(1);
    setReviewText('');
    setMessage('');
    onCancel(); // Notify parent to close form
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rating (1-5): </label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          className="border rounded p-1 ml-2"
        />
      </div>

      <div className="mt-4">
        <label>Review:</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows="4"
          cols="50"
          className="border rounded w-full p-2 mt-1"
        />
      </div>

      {/* Buttons spaced apart */}
      <div className="flex justify-between mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-400 text-white px-4 py-1 rounded"
        >
          Cancel
        </button>
      </div>

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </form>
  );
};

export default ReviewForm;
