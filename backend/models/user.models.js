import mongoose, { mongo } from 'mongoose';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        // avatar:{
        //  type:String,
        //  default:"",
        // },
        password: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ['host', 'guest'],
            default: 'guest',
        },
        // refreshToken: {
        //    type: String
        //   }
    },
    { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
