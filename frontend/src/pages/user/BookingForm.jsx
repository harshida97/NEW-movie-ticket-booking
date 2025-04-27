import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShowDetails } from '../../services/BookingApi';
import { createBooking } from '../../services/BookingApi';
import { createStripeSession } from '../../services/paymentAPI';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE);

const BookingForm = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  // Fetch show details on component mount or when showId changes
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getShowDetails(showId);
        setShow(data);
        setImageUrl(data.image);  // Setting the image URL for later use
        console.log("Fetched Show Data:", data);
      } catch (error) {
        console.error('Error fetching show details:', error);
        setErrorMessage('Failed to load show details. Please try again later.');
      }
    };

    if (showId) {
      fetchDetails();
    }
  }, [showId]);

  // Toggle seat selection
  const toggleSeat = (seatNumber) => {
    if (show.seats.some(seat => seat.seatNumber === seatNumber && seat.isBooked)) {
      setErrorMessage('This seat is already reserved.');
      return;
    }

    let updatedSeats;
    if (selectedSeats.includes(seatNumber)) {
      updatedSeats = selectedSeats.filter(seat => seat !== seatNumber);
    } else {
      updatedSeats = [...selectedSeats, seatNumber];
    }

    setSelectedSeats(updatedSeats);
    setTotalAmount(updatedSeats.length * (show?.pricePerSeat || 0));
  };

  // Handle payment
  const makePaymentFunction = async () => {
    if (!selectedSeats.length) return;
  
    try {
      // Step 1: Create booking
      const bookingRes = await createBooking(show._id, selectedSeats);

  
      if (!bookingRes || !bookingRes.bookingId) {
        setErrorMessage('Booking failed. Please try again.');
        return;
      }
  
      // Step 2: Create Stripe session
      const sessionRes = await createStripeSession({
        show: {
          showId: show._id,
          movie: show.movie,
          pricePerSeat: show.pricePerSeat,
          image: show.image,
        },
        seats: selectedSeats,
      });
  
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: sessionRes.data.sessionId,
      });
  
      if (result.error) {
        setErrorMessage(result.error.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Payment processing failed. Please try again.');
    }
  };
  

  if (!show) return <p>Loading show details...</p>;

  return (
    <div className="p-8">
      <h1 className="text-4xl text-center text-blue-950 font-bold mb-6">
        Book your seat and purchase your ticket
      </h1>

      <div className="mb-4">
        {imageUrl && (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${imageUrl.replace(/\\/g, '/')}`}
            alt={show.movie}
            className="w-full h-64 object-cover mb-4"
          />
        )}
        <h2 className="text-4xl text-center text-blue-1000 font-bold mb-6">{show.movie.toUpperCase()}</h2>
        <p>
          Showtime:
          <span className="font-bold text-blue-400 text-2xl">
            {new Date(show.showtime).toLocaleString()}
          </span>
        </p>
        <p>
          Price per Seat:
          <span className="font-bold text-blue-400 text-2xl">
            ${show.pricePerSeat}
          </span>
        </p>
      </div>

      {/* Seat Grid */}
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">Select Your Seats:</h3>
        <div className="grid grid-cols-10 gap-2">
          {show.seats && Array.isArray(show.seats) && show.seats.length > 0 ? (
            show.seats.map(seat => (
              <button
                key={seat.seatNumber}
                onClick={() => toggleSeat(seat.seatNumber)}
                disabled={seat.isBooked}
                className={`p-2 text-sm rounded ${seat.isBooked
                  ? 'reserved-seat'  // Style reserved seats differently
                  : selectedSeats.includes(seat.seatNumber)
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-200'
                }`}
              >
                {seat.isBooked ? "Reserved" : seat.seatNumber}
              </button>
            ))
          ) : (
            <p>No seats available.</p>
          )}
        </div>
      </div>

      <div className="mb-4 text-lg font-semibold text-gray-800">
        Total Selected: {selectedSeats.length} seat(s) - ${totalAmount.toFixed(2)}
      </div>

      <button
        type="button"
        className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700"
        disabled={selectedSeats.length === 0}
        onClick={makePaymentFunction}
      >
        Checkout
      </button>

      {message && <p className="mt-4 text-center text-3xl text-green-500">{message}</p>}
      {errorMessage && <p className="mt-4 text-center text-3xl text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default BookingForm;
