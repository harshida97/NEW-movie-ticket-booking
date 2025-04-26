// routes/userRoutes.js
import express from 'express';
import {isAuthenticated} from '../middlewares/middlewareAuth.js'
import { register, login,getUsers} from '../controllers/userController.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);

router.get('/users', isAuthenticated, getUsers);


export default router;
