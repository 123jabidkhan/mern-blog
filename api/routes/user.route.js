import express from 'express';
import {test, updateUser} from '../controllers/user.controller.js';
import verifyToken from '../utils/verifyUser.js';

const router = express.Router();

// user routes 
router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);


export default router;