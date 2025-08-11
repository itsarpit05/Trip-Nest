import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createBooking, deleteAllBookings, deleteBookings, getMyBookings } from "../controllers/bookings.controllers.js";
import { requireRole } from "../middlewares/role.middleware.js";



const router = Router();

router.post('/',verifyToken,requireRole("guest"),createBooking)
router.get('/mybookings',verifyToken,requireRole(["guest", "host"]),getMyBookings)  
router.delete('/all',verifyToken,requireRole("guest"),deleteAllBookings)    // order matters if /:id is placed above then /:id will match "all" as a parameter before the /all route is reached.
router.delete('/:id',verifyToken,requireRole("guest"),deleteBookings)



export default router