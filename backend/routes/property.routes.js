import { Router } from 'express';
import {
    createProperty,
    getAllProperties,
    findProperty,
    updateProperty,
    deleteProperty,
    searchProperties,
} from '../controllers/property.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

const router = Router();
// Property route
router.get('/search', searchProperties);
router.post('/', verifyToken, requireRole('host'), createProperty);
router.get('/', getAllProperties);
router.get('/:id', findProperty);
router.put('/:id', verifyToken, requireRole('host'), updateProperty);
router.delete('/:id', verifyToken, requireRole('host'), deleteProperty);

export default router;
