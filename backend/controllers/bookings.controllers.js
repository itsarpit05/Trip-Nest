import jwt from "jsonwebtoken"
 import { Bookings } from "../models/bookings.models.js"



//Create a booking
export const createBooking = async(req,res)=>{
  try {
    const bookings = new Bookings({
        ...req.body,
        user:req.user.id
    })
    await bookings.save();
    res
    .status(201)
    .json(bookings)
  } catch (error) {
     return res
     .status(400)
     .json({error:error.message})
  }
}


//Fetch all bookings
export const getMyBookings = async(req,res)=>{
    try {
        const bookings = await Bookings.find({user:req.user.id}).populate([
            {path:"property"},
            {path:"user" ,select:"-password"}
        ])
        // if(!bookings){
        // res.status(404)                             No need as find property returns null array
        // .json({msg:"Booking not found or authorized"})
        // }
        if (bookings.length === 0) {
    return res.status(404).json({ msg: "No bookings found" });
}

      res.json(bookings)
    } catch (error) {
        return res
        .status(500)
        .json({msg:"Server error",error:error.message})
    }
}

//Delete one booking
export const deleteBookings=async(req,res)=>{
    try {
     const bookings = await Bookings.findOneAndDelete({
    _id: req.params.id,
     user: req.user.id   // req.user comes from your verifyToken middleware
    });
    if(!bookings){
        return res.status(404)
        .json({msg:"Booking not found or authorized"})
    }
    res.json({msg:"Bookings cancelled"})
    } catch (error) {
        return res
        .status(500)
        .json({msg:"Server error"})
    }
}

//delete all bookings
export const deleteAllBookings = async(req,res)=>{
    try {
        const bookings = await Bookings.deleteMany({user:req.user.id});
        
        if (bookings.deletedCount === 0) {
            return res.status(404).json({ msg: "No bookings found to delete" });
        }
        res.json({msg:"All bookings cleared"})

    } catch (error) {
        return res
        .status(500)
        .json({msg:"Server error"})

    }
}