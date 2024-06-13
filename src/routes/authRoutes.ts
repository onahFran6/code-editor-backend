import express, { Router } from 'express';
import {
  register,
  login,
  uploadProfileImage,
} from '../controllers/authController';
import {
  validateLogin,
  validateRegistration,
} from '../lib/validators/authValidator';
import upload from '../utils/multer';
import { authenticate } from '../middleware/authMiddleware';

const router: Router = express.Router();

// const coupleUpload = upload.fields([{ name: 'profileImage', maxCount: 1 }]);
router.post(
  '/upload',
  authenticate,
  upload.single('profileImage'),
  uploadProfileImage,
);
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

export default router;
