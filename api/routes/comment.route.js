import express from 'express';
import verifyToken from '../utils/verifyUser.js';

import {
  createComment,
  deleteComments,
  editComment,
  getPostComments,
  getcomments,
  likeComment,
} from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComments', verifyToken, deleteComments);
router.get('/getcomments', verifyToken, getcomments);

export default router;
