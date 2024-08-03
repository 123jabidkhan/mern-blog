import express from 'express';
import { createPost } from '../controllers/comment.controller.js';
import verifyToken from '../utils/verifyUser.js';
const router = express.Router();

// comment routes 
router.post('/create',verifyToken, createPost);

export default router;