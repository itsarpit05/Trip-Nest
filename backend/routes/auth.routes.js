import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createUser, getUser, loginUser } from "../controllers/user.controllers.js";

const router = Router();


router.post('/',verifyToken,createUser)
router.post('/login',loginUser)
router.get('/me',verifyToken,getUser)

export default router