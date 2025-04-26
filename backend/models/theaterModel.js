// models/Theater.js
import mongoose from 'mongoose';

const theaterSchema = new mongoose.Schema({
    theaterName: { type: String, required: true },
    location: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isApproved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Theater', theaterSchema);
