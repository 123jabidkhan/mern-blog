import express from 'express';
import {test, updateUser, signout, deleteUser} from '../controllers/user.controller.js';
import verifyToken from '../utils/verifyUser.js';

const router = express.Router();

// user routes 
router.get('/test', test);
router.put('/update/:userId',verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);

export default router;