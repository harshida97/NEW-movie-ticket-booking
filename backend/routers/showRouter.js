// routes/showRoutes.js
import express from 'express';
import { addShow, deleteShow, getShowDetails, listShows, listShowsByOwner } from '../controllers/showController.js';
import { isAuthenticated, isAdmin, isOwner } from '../middlewares/middlewareAuth.js';
import upload from '../upload.js';

const router = express.Router();

// Update the addShow route to remove the theaterId from the URL
router.post('/addshow',isAuthenticated,isOwner, upload.single('image'), addShow);
router.get('/showlist', listShows);
router.get('/shows/:id', getShowDetails);
router.delete('/delete/:id', deleteShow);
router.get('/shows', isAdmin, listShowsByOwner);

export default router;

