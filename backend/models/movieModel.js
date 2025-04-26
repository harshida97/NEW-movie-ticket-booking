import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {type:String},
    releaseDate: { type: String },
    duration: { type: String, required: true },
    theater: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater' } ,// Reference to the Theater model
    image: { type: String }, // Add a field for the image URL or path
}, { timestamps: true });

export default mongoose.model('Movie', movieSchema);
