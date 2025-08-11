import jwt from "jsonwebtoken"
 import { Bookings } from "../models/bookings.models.js"
 import { Property } from "../models/property.models.js"



//Create a booking
export const createBooking = async (req, res) => {
  try {
    const { property, checkin, checkout, guests } = req.body;

    // 1. Get property details
    const foundProperty = await Property.findById(property);
    if (!foundProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    // 2. Date objects
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (checkoutDate <= checkinDate) {
      return res.status(400).json({ error: "Check-out must be after check-in" });
    }

    // 3. Check date overlap
    const overlappingBooking = await Bookings.findOne({
      property,
      $or: [
        { checkin: { $lt: checkoutDate },
         checkout: { $gt: checkinDate } }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({ error: "Dates overlap with an existing booking" });
    }

    // 4. Calculate nights
    const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));

    // 5. Calculate price
    const totalPrice = nights * foundProperty.pricePerNight;

    // 6. Save booking
    const booking = new Bookings({
      property,
      user: req.user.id,
      checkin: checkinDate,
      checkout: checkoutDate,
      guests,
      price: totalPrice
    });

    await booking.save();
    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Fetch all bookings
export const getMyBookings = async(req,res)=>{
    try {
        const bookings = await Bookings.find({user:req.user.id}).populate([
            {path:"property"},
            {path:"user" ,select:"-password"}
        ])
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