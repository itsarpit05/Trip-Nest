// routes/upload.routes.js
import { Router } from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';

const router = Router();
const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded.' });
    }
    res.status(200).json({ imageUrl: req.file.path });
});

export default router;
