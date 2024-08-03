import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

const createComment = async(req, res, next)=>{
    try{
        const {userId, postId, content} = req.body;
        if (userId !== req.user.id) {
            return next(
              errorHandler(403, 'You are not allowed to create this comment')
            );
          }
          
          const newComment  = new Comment({
            userId, postId, content
          })

          await newComment.save();
          res.status(200).json(newComment);
    }catch(error){
        next(error);
    }


}

export {createComment};