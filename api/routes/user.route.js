import express from 'express';
import {getUsers, updateUser, signout, deleteUsers, getUser} from '../controllers/user.controller.js';
import verifyToken from '../utils/verifyUser.js';

const router = express.Router();

// user routes 
router.put('/update/:userId',verifyToken, updateUser);
router.delete('/deleteusers', verifyToken, deleteUsers);
router.post('/signout', signout);
router.get('/getusers',verifyToken, getUsers);
router.get('/:userId', getUser);

export default router;