import mongoose  from "mongoose";

const propertySchema = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type : String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
     address:{
    street: String,
    city: String,
    country:String,
    state: String,
    zipCode: String,
    },
    pricePerNight:{
        type: Number,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    amenities: [{
        type: String,
    }],
    maxGuests: {
        type: Number,
        required: true,
        default:1,
    },     
   
},{timestamps:true})




export const Property = mongoose.model('Property',propertySchema);