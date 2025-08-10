
// import { Property } from '../models/property.models.js'
// import { User } from '../models/user.models.js'
import { Router } from 'express'
import { createProperty,getAllProperties,findProperty,updateProperty,deleteProperty } from '../controllers/property.controllers.js'
import { verifyToken } from '../middlewares/auth.middleware.js';


const router = Router()
// Property route
router.post('/',verifyToken,createProperty);
router.get('/',getAllProperties);
router.get('/:id',findProperty);
router.put('/:id',verifyToken,updateProperty);
router.delete('/:id',verifyToken,deleteProperty);

export default router
