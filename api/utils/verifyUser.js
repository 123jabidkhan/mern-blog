import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

const verifyToken = async (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    console.log(user);
    req.user = user;
    next();
  });
};


export default verifyToken;