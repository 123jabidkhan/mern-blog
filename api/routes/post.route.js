import express from 'express';
import { createPost, getPosts, deletePost} from '../controllers/post.controller.js';
import verifyToken from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createPost);
router.get('/getposts', getPosts);
router.delete('/deletepost', verifyToken, deletePost);


export default router;