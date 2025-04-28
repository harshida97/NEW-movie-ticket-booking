import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect } from '../config/db.js';
import userRouter from '../routers/userRouter.js';
import theaterRouter from '../routers/theaterRouter.js';
import movieRouter from '../routers/movieRouter.js';
import showRouter from '../routers/showRouter.js';
import bookingRouter from '../routers/bookingRouter.js';
import paymentRouter from '../routers/paymentRouter.js';
import reviewRouter from '../routers/reviewRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();

// For ES Modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to DB
connect();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

// Body parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// API Routes
app.use('/api/users', userRouter);
app.use('/api/theaters', theaterRouter);
app.use('/api/movies', movieRouter);
app.use('/api/shows', showRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/reviews', reviewRouter);


app.get("/", (req, res) => {
  res.json("Server started successfully");
});


export default app;
