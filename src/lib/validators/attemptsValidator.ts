import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ALLOWED_LANGUAGES } from '../../constants/language';

export const validateCreateAttempt = [
  body('problemId').isInt().withMessage('Problem ID must be an integer'),
  body('code').notEmpty().withMessage('Code is required'),
  body('language')
    .isString()
    .withMessage('Language must be a string')
    .isIn(ALLOWED_LANGUAGES)
    .withMessage(`Language must be one of: ${ALLOWED_LANGUAGES.join(', ')}`),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateGetUserAttempts = [
  param('userId').isInt().withMessage('User ID must be an integer'),
  param('problemId').isInt().withMessage('Problem ID must be an integer'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAttemptId = [
  param('id')
    .notEmpty()
    .withMessage('Attempt ID is required')
    .isInt()
    .withMessage('Attempt ID must be an integer'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateProblemId = [
  param('problemId')
    .notEmpty()
    .withMessage('Problem ID is required')
    .isInt()
    .withMessage('Problem ID must be an integer'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
