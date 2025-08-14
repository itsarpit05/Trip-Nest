import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createOrder,verifyPayment } from "../controllers/payment.controllers.js";


const router = Router();

router.post('/order', verifyToken, createOrder);

// Route to verify the payment after completion
router.post('/verify', verifyToken, verifyPayment);

export default router;