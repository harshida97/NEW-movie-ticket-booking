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
import reviewRouter from './routers/reviewRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();

// For ES Modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://new-movie-ticket-booking-24tc-lchor622t.vercel.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Content Security Policy (CSP) Middleware
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; " + 
    "script-src 'self' https://vercel.live; " +
    "img-src 'self' http://localhost:3000 https://movie-website-images.com; " +
    "style-src 'self' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com;"
  );
  next();
});

// Body parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server started successfully!' });
});

// API Routes
app.use('/api/users', userRouter);
app.use('/api/theaters', theaterRouter);
app.use('/api/movies', movieRouter);
app.use('/api/shows', showRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/reviews', reviewRouter);

// Database connection (inside serverless handler, not here!)
// We will call connect() manually in serverless function file

export default app;
