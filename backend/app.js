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
import serverless from 'serverless-http';  // ✅ Add this

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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
  res.json("Server started");
});


export const handler = serverless(app);
