import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema(
    {
      name:{
        type: String,
        required:true,
      },
      email:{
      type:String,
      required:true,
      unique:true,
      },
      password:{
        type:String,
        required:true,
        unique:true
      },
      role:{
      type:String,
      enum:["host","guest","admin"],
      default:"guest"
      }
},{timestamps:true})



export const User = mongoose.model('User',userSchema);