import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const hashed = await bcrypt.hash(password, 10);
    const userExist = await User.findOne({email});

    if(userExist){
      return res.status(401).json({
        message:"User already exists."
      })
    }
    const user = await User.create({ email, password: hashed });
  
    return res.json({ token: generateToken(user._id) });
  } catch (error) {
    throw new Error(error)
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(401).json({
        message:"Email and Password required"
      })
    }
  
    const user = await User.findOne({ email });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  
    return res.json({ token: generateToken(user._id) });
  } catch (error) {
    throw new Error(error)
  }
};