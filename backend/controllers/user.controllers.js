
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
    const accesstoken = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'1h'})


   const refreshToken = jwt.sign(
    {id:user._id},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:"7d"}
)
    
    user.refreshToken = refreshToken;
    await user.save();
  
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/api/auth"
    });


        const safeUser = await User.findById(user._id).select("-password -refreshToken");

        res
        .json({accesstoken,user:safeUser})

  } catch (err) {
    res
    .status(500)
    .json({error:err.message})
  }
}


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
   try {
     const refreshToken = req.cookies.refreshToken;
     if (refreshToken) {
       //// verify first (try..catch not necessary because jwt.verify throws)
         const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
         await User.findByIdAndUpdate(decoded.id, { refreshToken: null });
     }
 
     res.clearCookie("refreshToken", { path: "/api/auth" });
     res.json({ message: "Logged out" });
   } catch (error) {
     res.clearCookie("refreshToken", { path: "/api/auth" });
      return res.status(500).json({ msg: "Logout failed", error: error.message });
   }
};




// Refresh token route
export const refreshAccessToken = async (req, res) => {
  try{
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ msg: "No refresh token" });

  
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
   
    //keep response key name consistent with login (accesstoken)
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ msg: "Refresh token expired or invalid" });
  }
};