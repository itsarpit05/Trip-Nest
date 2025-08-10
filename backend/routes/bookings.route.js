import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createBooking, deleteAllBookings, deleteBookings, getMyBookings } from "../controllers/bookings.controllers.js";



const router = Router();

router.post('/',verifyToken,createBooking)
router.get('/mybookings',verifyToken,getMyBookings)
router.delete('/:id',verifyToken,deleteBookings)
router.delete('/all',verifyToken,deleteAllBookings)


export default router