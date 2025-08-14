import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

import connectDB from './config/db.js';
import propertyRoutes from './routes/property.routes.js';
import bookingsRoutes from './routes/bookings.route.js';
import uploadRoutes from './routes/upload.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config({
    path: './.env',
});
const app = express();
connectDB();
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }),
);
app.use(express.json()); // without this req.body will be undefined when sending JSON from frontend
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
    res.send('API is running..');
});

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
