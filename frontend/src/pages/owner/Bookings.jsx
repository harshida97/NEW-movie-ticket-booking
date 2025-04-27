import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  // API base URL from environment variable
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/bookings/getallbookings`);
        console.log(response.data);
        setBookings(response.data);
      } catch (error) {
        alert('Error fetching bookings: ' + error.message);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      
      <h1 className='text-red-600 text-center text-2xl mt-5'>All Bookings</h1>
      <ul className="max-w-3xl mx-auto mt-6">
        {bookings.map((booking) => (
          <li key={booking._id} className="mb-4 border-b border-gray-200 pb-4">
            <p><strong>User Name:</strong> {booking.user?.name || 'N/A'}</p>
            <p><strong>User Email:</strong> {booking.user?.email || 'N/A'}</p>
            <p><strong>Show:</strong> {booking.show?.movie || 'N/A'}</p>
            <p><strong>Time:</strong> {booking.show?.showtime || 'N/A'}</p>
            <p><strong>Seats Booked:</strong> {booking.seatsBooked || 'None'}</p>
            <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
