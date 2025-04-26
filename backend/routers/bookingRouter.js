// routes/bookingRoutes.js
import express from 'express';
import { createBooking} from '../controllers/bookingController.js';
import { isAuthenticated } from '../middlewares/middlewareAuth.js';

const router = express.Router();
router.post('/createbooking',isAuthenticated, createBooking);
//router.get('/getallbookings',getAllBookings);

export default router;
