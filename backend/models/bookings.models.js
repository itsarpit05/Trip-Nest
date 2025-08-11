import mongoose from "mongoose";

const bookingsSchema = mongoose.Schema({
    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property",
        required:true
    },
    user:{
     type:mongoose.Schema.Types.ObjectId,
     ref: "User",
     required:true
    },
    checkin:{
        type:Date,
        required:true,
    },
    checkout:{
     type:Date,
     required:true,
    }, 
    guests:{
      type:Number,
      required:true,
      default:1
    },
    price: {   
        type: Number,
        required: true
    },
    status:{
        type:String,
        enum:["Booked","Pending","Cancelled"],
        default:"Pending"
    }
},{timestamps:true})



export const Bookings = mongoose.model("Bookings",bookingsSchema)