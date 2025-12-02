/**
 * Frontend Type Definitions
 *
 * TypeScript interfaces for:
 * - Analysis results from API
 * - Component props
 * - Application state
 */

/**
 * Analysis result from the backend API
 */
export interface AnalysisResult {
  originalArgument: string;
  steelmanCounter: string;
  weakPoints: string[];
  misconceptions: string[];
  reinforcements: string[];
  opposingResponses: string[];
}

/**
 * Props for ArgumentInput component
 */
export interface ArgumentInputProps {
  onSubmit: (argument: string) => void;
  isLoading: boolean;
}

/**
 * Props for AnalysisResults component
 */
export interface AnalysisResultsProps {
  result: AnalysisResult | null;
}
