import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import connectDB from './config/db.js';
import propertyRoutes from './routes/property.routes.js';
import bookingsRoutes from './routes/bookings.route.js';
import uploadRoutes from './routes/upload.routes.js';
import paymentRoutes from './routes/payment.routes.js'
import cookieParser from 'cookie-parser';

dotenv.config({
    path: './.env',
});
const app = express();
connectDB();
const clientURL = process.env.NODE_ENV === 'production' 
    ? 'https://trip-nest-five.vercel.app' // Your live frontend URL
    : process.env.CLIENT_URL; 
app.use(
    cors({
        origin: clientURL,
        credentials: true,
    }),
);
app.use(express.json()); // without this req.body will be undefined when sending JSON from frontend
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/payment', paymentRoutes)

app.get('/', (req, res) => {
    res.send('API is running..');
});

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
