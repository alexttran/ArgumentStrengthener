/**
 * API Client Service
 *
 * Handles HTTP requests to the backend API
 * POST /api/analysis - Sends argument and receives analysis
 */

import { AnalysisResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Analyzes an argument by sending it to the backend API
 * @param argument - The argument text to analyze
 * @returns Promise containing the analysis result
 * @throws Error if the API request fails
 */
export async function analyzeArgument(argument: string): Promise<AnalysisResult> {
  const response = await fetch(`${API_BASE_URL}/analysis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ argument }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Failed to analyze argument');
  }

  return response.json();
}
