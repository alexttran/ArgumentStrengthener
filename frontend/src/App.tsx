/**
 * Main App Component
 *
 * Root component that:
 * - Manages application state
 * - Renders ArgumentInput and AnalysisResults components
 * - Coordinates data flow between components
 */

import { useState } from 'react';
import ArgumentInput from './components/ArgumentInput';
import AnalysisResults from './components/AnalysisResults';
import { analyzeArgument } from './services/api';
import { AnalysisResult } from './types';
import './App.css';

export default function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (argument: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const analysis = await analyzeArgument(argument);
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze argument');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Argument Strengthener</h1>
        <p className="subtitle">
          Pressure-test your opinions with steelman counterarguments and strategic insights
        </p>
      </header>

      <main className="app-main">
        <ArgumentInput onSubmit={handleAnalyze} isLoading={isLoading} />

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Analyzing your argument...</p>
          </div>
        )}

        <AnalysisResults result={result} />
      </main>
    </div>
  );
}
