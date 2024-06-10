import express, { Router } from 'express';
import {
  getUsersController,
  getUserStatsController,
  getUserAttemptDetailsController,
} from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router: Router = express.Router();

router.get('/users', authenticate, authorize('admin'), getUsersController);
router.get(
  '/users/:userId/stats',
  authenticate,
  authorize('admin'),
  getUserStatsController,
);
router.get(
  '/users/:userId/attempts',
  authenticate,
  authorize('admin'),
  getUserAttemptDetailsController,
);

export default router;
