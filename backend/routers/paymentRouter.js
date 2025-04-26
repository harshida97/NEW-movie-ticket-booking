
import express from 'express';
import {paymentFunction} from '../controllers/paymentController.js'
import { isAuthenticated } from '../middlewares/middlewareAuth.js';



const router = express.Router();


router.post('/stripe-checkout',isAuthenticated,paymentFunction);



export default router;

