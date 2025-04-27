import React, { useState } from 'react';
import { registerTheater } from '../../services/theaterApi';
import { useNavigate } from 'react-router-dom';

const RegisterTheater = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    theaterName: '',
    location: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = await registerTheater(form, token);

      localStorage.setItem('theaterId', data.theaterId); // Save the ID
      alert('Theater registered successfully');
      navigate('/owner/theaters');
      setForm({ theaterName: '', location: '' });
    } catch (error) {
      alert('Error registering theater: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      

      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Register Theater</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Theater Name</label>
            <input
              type="text"
              name="theaterName"
              value={form.theaterName}
              onChange={handleChange}
              placeholder="Theater Name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register Theater
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTheater;
