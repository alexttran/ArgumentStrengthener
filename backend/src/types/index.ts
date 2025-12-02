/**
 * Backend Type Definitions
 *
 * TypeScript interfaces for:
 * - API request/response shapes
 * - Argument analysis data structures
 */

/**
 * Request body for the analysis endpoint
 */
export interface AnalysisRequest {
  argument: string;
}

/**
 * Complete analysis result returned by the API
 * Contains all 5 components of argument analysis
 */
export interface AnalysisResult {
  originalArgument: string;
  steelmanCounter: string;
  weakPoints: string[];
  misconceptions: string[];
  reinforcements: string[];
  opposingResponses: string[];
}
