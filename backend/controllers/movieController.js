// controllers/movieController.js
import Movie from '../models/movieModel.js';

export const addMovie = async (req, res) => {
    try {
        const { title,description,releaseDate,duration,theater} = req.body;
        const image = req.file ? req.file.path : null;

        const movie = new Movie({
            title,
            description,
            releaseDate,
            duration,
            theater,
            image // Save the image path in the database
        });

        await movie.save();
        res.status(201).json({ message: 'Movie added successfully', movie });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params; // Get the movie ID from the request parameters
        const movie = await Movie.findByIdAndDelete(id); // Delete the movie

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' }); // Handle case where movie is not found
        }

        res.status(200).json({ message: 'Movie deleted successfully' }); // Respond with success message
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
};



export const listMovies = async (req, res) => {
    try {
        const movies = await Movie.find().populate('theater');
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
