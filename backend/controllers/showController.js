import Show from '../models/showModel.js';
import Theater from '../models/theaterModel.js';



export const addShow = async (req, res) => {
  try {
      const { movie, description, releaseDate, showtime, duration, pricePerSeat, theaterId } = req.body;

      console.log('Received form data:', req.body);
      console.log('Received image file:', req.file);

      // Ensure all required fields are present
      if (!movie || !description || !releaseDate || !showtime || !pricePerSeat || !theaterId) {
          return res.status(400).json({ error: 'All fields are required' });
      }

      // Convert pricePerSeat to a number and validate
      const price = parseFloat(pricePerSeat);
      if (isNaN(price)) {
          return res.status(400).json({ error: 'Price per seat must be a valid number' });
      }

      // Handle the uploaded image
      const image = req.file ? req.file.path : '';

      // Generate seats (if needed for your use case)
      const seats = [];
      for (let i = 1; i <= 50; i++) {
          seats.push({
              seatNumber: `S${i}`,
              isBooked: false,
          });
      }

      // Ensure that the theaterId is valid (you can check if the theater exists)
      const theater = await Theater.findById(theaterId);
      if (!theater) {
          return res.status(400).json({ error: 'Invalid theater ID' });
      }

      // Create the new show object with the correct theater reference
      const newShow = new Show({
          movie,
          description,
          releaseDate,
          showtime,
          duration,
          pricePerSeat: price,
          theater: theaterId, // Save the correct theater reference
          image,
          seats,
      });

      // Save the new show in the database
      const savedShow = await newShow.save();

      res.status(201).json(savedShow);
  } catch (error) {
      console.error('Error adding show:', error);
      res.status(500).json({ error: 'Server error' });
  }
};

  
  
// Function to delete a show
export const deleteShow = async (req, res) => {
    try {
        const { id } = req.params;
        const show = await Show.findByIdAndDelete(id);

        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }

        res.status(200).json({ message: 'Show deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

///  get show details
// Get show details with populated theater
export const getShowDetails = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate({
        path: 'theater',
        select: 'theaterName location', // Ensure that only necessary fields are returned
      });

    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    res.status(200).json({
      _id: show._id,
      movie: show.movie,
      description: show.description,
      releaseDate: show.releaseDate,
      duration: show.duration,
      showtime: show.showtime,
      pricePerSeat: show.pricePerSeat,
      image: show.image,
      theaterName: show.theater?.theaterName || 'N/A', // If theater is not found, use fallback
      location: show.theater?.location || 'N/A',
      seats: show.seats,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Function to list all shows
export const listShows = async (req, res) => {
  try {
    const shows = await Show.find()
      .populate({
        path: 'theater',
        select: 'theaterName location',
      });

    const backendBaseUrl = "https://new-movie-ticket-booking.onrender.com";

    const showsWithFullImageUrls = shows.map(show => {
      const showObj = show.toObject();

      // Corrected condition
      if (showObj.image && !showObj.image.startsWith('http')) {
        showObj.image = `${backendBaseUrl}/${showObj.image.replace(/\\/g, '/')}`;
      }

      return showObj;
    });

    res.json(showsWithFullImageUrls);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// Function to list shows by theater owner
export const listShowsByOwner = async (req, res) => {
    try {
        const { ownerId } = req.query;

        // Find theaters owned by the specific owner
        const theaters = await Theater.find({ owner: ownerId });
        const theaterIds = theaters.map(theater => theater._id);

        // Find shows for the theaters owned by this owner
        const shows = await Show.find({ theater: { $in: theaterIds } })
            .populate('theater') // Include theater details
            .populate('movie'); // Include movie details

        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
