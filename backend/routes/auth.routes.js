import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { User } from '../controllers/user.controllers.js'

const router = Router();

// Signup route

router.route('/signup')
.post(async(req,res)=>{
  const {name,email,password} = req.body //extracts name ,email and password from the request body sent by the client

 try {
     let user = await User.findOne({email})
   
     // check if user exists
     if(user){
       return res
       .status(400)
       .json({msg:"User already exists"})
     }
   
       // if not exists then hash the password
       const hashedPassword = await bcrypt.hash(password,10)
   
       //create new user
   
       user = await User.create({name,email,password:hashedPassword})
       res
       .status(200)
       .json({msg:"User registered successfully"})
     
 } catch (err) {
    res
    .status(500)
    .json({error:err.message})
 }
})


//login route
router.route('/login')
.post(async(req,res)=>{
   const {email,password}= req.body;
  try {
    let user = await User.findOne({email})
    if(!user){
        return res
        .status(400)
        .json({msg:"User not found with this email"})
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        return res
        .status(400)
        .json({msg:"User not found with this password"})
    }
    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'1h'})

        res
        .json({token ,user})

  } catch (err) {
    res
    .status(500)
    .json({error:err.message})
  }

  
});
 export default router