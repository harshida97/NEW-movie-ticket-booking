import Show from '../models/showModel.js';
import Booking from '../models/bookingModel.js';
import mongoose from 'mongoose';

export const createBooking = async (req, res) => {
  const { show, seatsBooked } = req.body;
  console.log("Received data:", { show, seatsBooked });

  const showId = show;
  const selectedSeats = seatsBooked;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const fetchedShow = await Show.findById(showId)
      .session(session)
      .select('seats pricePerSeat theater'); // ✅ include theater

    if (!fetchedShow) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Show not found' });
    }

    const unavailableSeats = selectedSeats.filter(seatNumber =>
      fetchedShow.seats.some(seat => seat.seatNumber === seatNumber && seat.isBooked)
    );

    if (unavailableSeats.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: `Seats ${unavailableSeats.join(', ')} are already booked.`,
      });
    }

    fetchedShow.seats = fetchedShow.seats.map(seat =>
      selectedSeats.includes(seat.seatNumber)
        ? { ...seat.toObject(), isBooked: true }
        : seat
    );

    const totalAmount = selectedSeats.length * fetchedShow.pricePerSeat;

    const booking = new Booking({
      user: req.user.id,
      show: showId,
      theater: fetchedShow.theater, // ✅ include theater here
      seatsBooked: selectedSeats,
      totalAmount,
    });

    await booking.save({ session });
    await fetchedShow.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: 'Booking successful',
      updatedSeats: fetchedShow.seats,
      bookingId: booking._id,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Booking failed error:", error);
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};
