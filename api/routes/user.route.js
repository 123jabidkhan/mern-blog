import express from 'express';
import {getUsers, updateUser, signout, deleteUser} from '../controllers/user.controller.js';
import verifyToken from '../utils/verifyUser.js';

const router = express.Router();

// user routes 
router.put('/update/:userId',verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers',verifyToken, getUsers);

export default router;