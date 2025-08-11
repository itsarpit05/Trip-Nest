
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js';



export const createUser = async(req,res)=>{
  const {name,email,password} = req.body //extracts name ,email and password from the request body sent by the client

 try {
     let user = await User.findOne({email})
   
     // check if user exists
     if(user){
       return res
       .status(400)
       .json({msg:"User already exists"})
     }
   
       const hashedPassword = await bcrypt.hash(password,10)
   
       user = await User.create({name,email,password:hashedPassword,role})
       res
       .status(201)
       .json({msg:"User registered successfully"})
     
 } catch (err) {
    res
    .status(500)
    .json({error:err.message})
 }
}



export const loginUser = async(req,res)=>{
   const {email,password}= req.body;
  try {
    let user = await User.findOne({email})
    if(!user){
        return res
        .status(401)
        .json({msg:"User not found with this email"})
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        return res
        .status(401)
        .json({msg:"Invalid credentials"})
    }
    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'1h'})

        res
        .json({token,user})

  } catch (err) {
    res
    .status(500)
    .json({error:err.message})
  }
}


export const getUser =  async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};