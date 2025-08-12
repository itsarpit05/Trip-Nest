
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js';



export const createUser = async(req,res)=>{
  const {name,email,password,role} = req.body //extracts name ,email and password from the request body sent by the client

 try {
     let user = await User.findOne({email})
   
     // check if user exists
     if(user){
       return res
       .status(400)
       .json({msg:"User already exists"})
     }
   
       const hashedPassword = await bcrypt.hash(password,10)
   
       user = await User.create({name,email,password:hashedPassword,role:role||"guest"})
       res
       .status(201)
       .json({msg:"User registered successfully"})
     
 } catch (err) {
    res
    .status(500)
    .json({error:err.message})
 }
}



// login user

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
        {id:user._id,role: user.role},
        process.env.JWT_SECRET,
        {expiresIn:'1h'})


    const userResponse = user.toObject();
    delete userResponse.password;

   res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/" // Make the cookie available to the entire site
        }).status(200).json(userResponse);


  } catch (err) {
    res
    .status(500)
    .json({error:err.message})
  }
}

//get user
export const getUser =  async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -refreshToken");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// logout 
export const logout = async (req, res) => {
 
    res.clearCookie("token", { path: "/" });
    res.status(200).json({ message: "Logged out successfully" });

};


