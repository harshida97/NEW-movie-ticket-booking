import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
});

const showSchema = new mongoose.Schema({
  movie: { type: String, required: true },
  description: { type: String },
  releaseDate: { type: String },
  duration: { type: String, required: true },
  theater: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater' },
  showtime: { type: Date, required: true },
  pricePerSeat: { type: Number, required: true },
  image: { type: String },
  seats: [seatSchema] // ✅ Add dynamic seats
}, { timestamps: true });

export default mongoose.model('Show', showSchema);
