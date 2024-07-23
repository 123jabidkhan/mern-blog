import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

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

export { signUp };
