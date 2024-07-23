import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

const signUp = async (req, res, next) =>{
    const {username, email, password} = req.body;
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400, "All fields are required."))
    }

    // hashed password
    const hashedPassword = await bcryptjs.hash(password, 10);
    // newuser
    const newUser = new User({username, email, password:hashedPassword});
    
    try{
        await newUser.save();
        res.json({message:"Signup successfull."});
    }catch(error){
        next(error);
    }

}

export {signUp};