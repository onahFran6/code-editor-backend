import express, { Router } from 'express';
import {
  createAttempt,
  getAttemptById,
  getAttemptsByProblemId,
  getUserAttempts,
  saveAttempt,
} from '../controllers/attemptController';
import { authenticate } from '../middleware/authMiddleware';
import {
  validateAttemptId,
  validateCreateAttempt,
  validateProblemId,
} from '../lib/validators/attemptsValidator';

const router: Router = express.Router();

router.post('/', authenticate, validateCreateAttempt, createAttempt);
router.get('/:id', authenticate, validateAttemptId, getAttemptById);
router.get(
  '/problem/:problemId',
  authenticate,
  validateProblemId,
  getAttemptsByProblemId,
);
router.post('/save', authenticate, saveAttempt);

export default router;
