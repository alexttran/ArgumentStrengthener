/**
 * Analysis Routes
 *
 * Handles API endpoints for argument analysis
 * POST /api/analysis - Receives user arguments and returns analysis
 */

import { Router, Request, Response } from 'express';
import { analyzeArgument } from '../services/openai';
import { AnalysisRequest } from '../types';

const router = Router();

/**
 * POST /api/analysis
 * Analyzes an argument and returns steelman counterarguments, weak points, etc.
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { argument }: AnalysisRequest = req.body;

    if (!argument || typeof argument !== 'string' || argument.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid input. Please provide a valid argument text.'
      });
    }

    const analysis = await analyzeArgument(argument);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing argument:', error);
    res.status(500).json({
      error: 'Failed to analyze argument. Please try again later.'
    });
  }
});

export default router;
