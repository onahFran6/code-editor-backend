import express, { Router } from 'express';
import {
  getProblems,
  getProblem,
  getProblemWithTests,
} from '../controllers/problemController';
import { authenticate } from '../middleware/authMiddleware';
import { getProblemById } from '../services/problemService';

const router: Router = express.Router();

// GET /api/problems - Get all problems
router.get('/', getProblems);
router.get('/problem/:id', getProblem);
router.get('/:id', authenticate, getProblemWithTests);

// You can add more routes here, such as:
// GET /api/problems/:id - Get a specific problem by ID
// POST /api/problems - Create a new problem (admin only)
// PUT /api/problems/:id - Update a problem (admin only)
// DELETE /api/problems/:id - Delete a problem (admin only)

export default router;
