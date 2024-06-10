import express, { Router } from 'express';
import { register, login } from '../controllers/authController';
import {
  validateLogin,
  validateRegistration,
} from '../lib/validators/authValidator';

const router: Router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

export default router;
