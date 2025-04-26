// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
    theater: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
    seatsBooked: [{ type: String, required: true }],
    totalAmount: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
