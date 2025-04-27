import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addShow } from '../../services/showApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddShow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theaterId, theaterName } = location.state || {};

  const [showDetails, setShowDetails] = useState({
    movie: '',
    description: '',
    releaseDate: new Date(),
    duration: '',
    showtime: new Date(),
    pricePerSeat: 0,
    image: null,
    theaterId: theaterId || '',
  });

  useEffect(() => {
    if (theaterId) {
      setShowDetails(prev => ({ ...prev, theaterId }));
    }
  }, [theaterId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === 'file') {
      setShowDetails({ ...showDetails, image: files[0] });
    } else if (name === 'pricePerSeat') {
      setShowDetails({ ...showDetails, [name]: parseFloat(value) });
    } else {
      setShowDetails({ ...showDetails, [name]: value });
    }
  };

  // Handle date changes for releaseDate and showtime
  const handleDateChange = (field, date) => {
    setShowDetails((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log the showDetails object before submitting
    console.log('Final Show Details before sending:', showDetails);
  
    const formData = new FormData();
  
    // Append releaseDate and showtime as strings
    formData.append('releaseDate', showDetails.releaseDate.toISOString());
    formData.append('showtime', showDetails.showtime.toISOString());
  
    // Log to verify form data before sending
    console.log("FormData being sent:");
    Object.entries(showDetails).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  
    // Loop through the remaining fields
    Object.entries(showDetails).forEach(([key, value]) => {
      if (key !== 'releaseDate' && key !== 'showtime') {
        if (key === 'pricePerSeat') {
          formData.append(key, value); // This should now be a number
        } else if (key === 'image' && value) {
          formData.append(key, value); // Append the image if it exists
        } else {
          formData.append(key, value); // For other fields
        }
      }
    });
  
    // Log the FormData to verify its contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      await addShow(formData); // Send the data to the backend
      alert('Show added successfully');
      navigate('/owner/theaters');
    } catch (error) {
      alert('Error adding show: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!theaterId) {
    return (
      <div className="text-center mt-8 text-red-600 font-semibold">
        No theater selected. Please go back and select a theater.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Show</h1>
      <div className="mb-4 text-gray-800 font-medium">
        🎭 Selected Theater: <strong>{theaterName}</strong>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Movie</label>
          <input
            type="text"
            name="movie"
            value={showDetails.movie}
            onChange={handleChange}
            placeholder="Enter movie name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={showDetails.description}
            onChange={handleChange}
            placeholder="About movie"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Release Date</label>
          <DatePicker
            selected={showDetails.releaseDate}
            onChange={(date) => handleDateChange('releaseDate', date)}
            dateFormat="MMMM d, yyyy"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            value={showDetails.duration}
            onChange={handleChange}
            placeholder="Enter duration (e.g. 2h 30m)"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Show Date & Time</label>
          <DatePicker
            selected={showDetails.showtime}
            onChange={(date) => handleDateChange('showtime', date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price Per Seat</label>
          <input
          type="number"
          name="pricePerSeat"
          value={showDetails.pricePerSeat}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Show
        </button>
      </form>
    </div>
  );
};

export default AddShow;
