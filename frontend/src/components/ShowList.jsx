import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getShowList, deleteShow } from "../services/showApi";
import { getAverageRating, getReviewsForMovie } from '../services/ReviewApi';
import ReviewForm from '../pages/user/ReviewForm';

const ShowList = ({ role }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedShowId, setExpandedShowId] = useState(null);
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getShowList();
        setShows(data);

        const ratingsData = {};
        const reviewsData = {};

        for (let show of data) {
          try {
            const avg = await getAverageRating(show._id);
            ratingsData[show._id] = avg?.averageRating || 0;

            const showReviews = await getReviewsForMovie(show._id);
            reviewsData[show._id] = showReviews || [];
          } catch {
            ratingsData[show._id] = 0;
            reviewsData[show._id] = [];
          }
        }

        setRatings(ratingsData);
        setReviews(reviewsData);
      } catch (err) {
        setError('Error fetching shows');
        console.error('Error fetching shows:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Show?')) {
      try {
        await deleteShow(id);
        alert('Show deleted successfully');
        setShows(shows.filter(show => show._id !== id));
      } catch (error) {
        setError('Failed to delete show.');
      }
    }
  };

  const renderStars = (rating, showId) => {
    const stars = [];
    const rounded = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl cursor-pointer ${i <= rounded ? 'text-yellow-500' : 'text-gray-300'}`}
          onClick={() => {
            if (role === 'user') {
              setExpandedShowId(prevId => (prevId === showId ? null : showId));
            } else {
              navigate(`/reviews/${showId}`);
            }
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) return <p>Loading shows...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Show List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shows.map((show) => {
          const imageUrl = show.image || '';
          const avgRating = ratings[show._id] || 0;

          return (
            <div
              key={show._id}
              className="bg-white shadow-md text-center rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={show.movie}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{show.movie}</h2>
              <p className="text-gray-700 mb-1">
                Theater: {show.theater ? show.theater.theaterName : 'No theater information'}
              </p>
              <p className="text-gray-700 mb-1">
                Location: {show.theater ? show.theater.location : 'N/A'}
              </p>
              <p className="text-gray-700 mb-1">
                Release Date: {new Date(show.releaseDate).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-1">
                Showtime: {new Date(show.showtime).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-1">Price per Seat: ${show.pricePerSeat}</p>

              {/* ⭐ Star Rating */}
              <div className="mt-2">{renderStars(avgRating, show._id)}</div>

              {/* Buttons based on role */}
              <div className="mt-4">
                {(role === 'owner' || role === 'admin') && (
                  <button
                    onClick={() => handleDelete(show._id)}
                    className="bg-orange-400 text-white ml-2 w-[70px] rounded-xl"
                  >
                    Delete
                  </button>
                )}

                {role === 'user' && (
                  <button
                    className="bg-blue-500 text-white ml-2 w-[90px] rounded-xl"
                    onClick={() => navigate(`/bookings/${show._id}`)}
                  >
                    Book Now
                  </button>
                )}
              </div>

              

              {/* Review Form for users */}
              {expandedShowId === show._id && role === 'user' && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                  <ReviewForm
  movieId={show._id}
  onReviewSubmitted={() => setExpandedShowId(null)}
  onCancel={() => setExpandedShowId(null)}
/>
                  <button
                    onClick={() => navigate(`/reviews/${show._id}`)}
                    className="mt-2 bg-purple-600 text-white py-1 px-4 rounded hover:bg-purple-700"
                  >
                    All Reviews
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowList;
