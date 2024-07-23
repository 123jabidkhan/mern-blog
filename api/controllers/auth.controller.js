import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

// new user create
const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required."));
  }
  // Generate salt
  const salt = await bcrypt.genSalt(10)
  // hashed password
  const hashedPassword = await bcrypt.hash(password, salt);
  // newuser
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json({ message: "Signup successfull." });
  } catch (error) {
    next(error);
  }
};

// login user
const signIn = async (req, res, next) =>{
    const {email, password} = req.body;
    if(!email || !password || email === '' || password === ''){
        return next(errorHandler(400, "All fields are required."));
    }
    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(400, "User not found!"));
        }
        
        const validPassword = await bcrypt.compare(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400, "Invalid credentials!"));
        }
        
        // generate token
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET_KEY);

        // get user without password
        const {password:pass, ...rest} = validUser._doc;

        res.status(200)
        .cookie('access_token',token, {
            httpOnly:true
        }).json(rest)
    }catch(error){

    }
   
}

export { signUp , signIn};
