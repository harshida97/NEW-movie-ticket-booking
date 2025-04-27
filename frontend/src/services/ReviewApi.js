// services/reviewApi.js
import { userInstance } from '../axios/axiosInstance';

// Function to add a review
export const addReview = async (reviewData) => {
  try {
    const response = await userInstance.post('/reviews/add', reviewData);
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Function to get reviews for a movie
export const getReviewsForMovie = async (movieId) => {
  try {
    const response = await userInstance.get(`/reviews/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const getAverageRating = async (movieId) => {
    const res = await userInstance.get(`/reviews/average/${movieId}`);
    return res.data;
  };
  
  export const getAllReviews = async (movieId) => {
    const res = await userInstance.get(`/reviews/movie/${movieId}`);
    return res.data;
  };
