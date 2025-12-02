/**
 * Analysis Results Component
 *
 * Displays the 5 analysis components:
 * - Steelman counterargument
 * - Weak points
 * - Misconceptions
 * - Reinforcement strategies
 * - Opposing responses
 */

import { AnalysisResultsProps } from '../types';

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  if (!result) {
    return null;
  }

  return (
    <div className="analysis-results">
      <div className="result-section">
        <h2>Your Argument</h2>
        <p className="original-argument">{result.originalArgument}</p>
      </div>

      <div className="result-section steelman">
        <h2>Steelman Counterargument</h2>
        <p>{result.steelmanCounter}</p>
      </div>

      <div className="result-section weak-points">
        <h2>Weak Points</h2>
        <ul>
          {result.weakPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="result-section misconceptions">
        <h2>Common Misconceptions</h2>
        <ul>
          {result.misconceptions.map((misconception, index) => (
            <li key={index}>{misconception}</li>
          ))}
        </ul>
      </div>

      <div className="result-section reinforcements">
        <h2>Reinforcement Strategies</h2>
        <ul>
          {result.reinforcements.map((reinforcement, index) => (
            <li key={index}>{reinforcement}</li>
          ))}
        </ul>
      </div>

      <div className="result-section opposing">
        <h2>Anticipated Opposing Responses</h2>
        <ul>
          {result.opposingResponses.map((response, index) => (
            <li key={index}>{response}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
