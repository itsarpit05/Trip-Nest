import express from 'express'
// import mongoose from 'mongoose' // Object data modelling library for mongoDB
// import dotenv from 'dotenv'  Imports dotenv, a package that loads environment variables from a .env file into process.env.

// This allows you to keep secrets (like MONGO_URI and JWT_SECRET) outside your code.

import cors from 'cors' // helps backend runnig on lssay port 5000 to connect with frontend running on port 3000
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import propertyRoutes from './routes/property.routes.js'
import bookingsRoutes from './routes/bookings.route.js'


dotenv.config({
    path:'./.env'
})
const app = express();
connectDB();
app.use(cors());
app.use(express.json()) // without this req.body will be undefined when sending JSON from frontend
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings',bookingsRoutes);

// mongoose.connect(process.env.MONGO_URI)
// .then(()=>console.log('MongoDB connected'))
// .catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.send("API is running..")
})

app.listen(process.env.PORT,()=>{
 console.log(`server running on port ${process.env.PORT}`)
});