import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createUser, getUser, loginUser ,logout,refreshAccessToken} from "../controllers/user.controllers.js";

const router = Router();


router.post('/',createUser)
router.post('/login',loginUser)
router.get('/me',verifyToken,getUser)
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);
export default router