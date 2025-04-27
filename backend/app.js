import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect } from './config/db.js';
import userRouter from './routers/userRouter.js';
import theaterRouter from './routers/theaterRouter.js';
import movieRouter from './routers/movieRouter.js';
import showRouter from './routers/showRouter.js';
import bookingRouter from './routers/bookingRouter.js';
import paymentRouter from './routers/paymentRouter.js';
import reviewRouter from './routers/reviewRouter.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to set Content Security Policy
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; " + 
    "script-src 'self' https://vercel.live; " +
    "img-src 'self' http://localhost:3000 https://movie-website-images.com; " +  // Add your image domains here
    "style-src 'self' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com;");
  next();
});

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ message: 'server started' });
});

// CORS configuration for front-end and back-end interaction
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://new-movie-ticket-booking-vvre.vercel.app'
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allows cookies to be sent with the request (if needed)
};

app.use(cors(corsOptions));

// Routes
app.use('/api/users', userRouter);
app.use('/api/theaters', theaterRouter);
app.use('/api/movies', movieRouter);
app.use('/api/shows', showRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/payment',paymentRouter);
app.use('/api/reviews',reviewRouter)

// To handle file uploads
app.use(express.urlencoded({ extended: true }));


app.use('/upload', express.static(path.join(__dirname, 'upload')));


// Database connection
connect()
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

console.log('MongoDB URI from .env in app.js:', process.env.DB_URL);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});  