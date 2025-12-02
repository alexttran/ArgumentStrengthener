/**
 * Argument Input Component
 *
 * Text input field where users enter their argument/opinion
 * Handles submission to trigger analysis
 */

import { useState } from 'react';
import { ArgumentInputProps } from '../types';

export default function ArgumentInput({ onSubmit, isLoading }: ArgumentInputProps) {
  const [argument, setArgument] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (argument.trim()) {
      onSubmit(argument.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="argument-input">
      <textarea
        value={argument}
        onChange={(e) => setArgument(e.target.value)}
        placeholder="Enter your argument or opinion here..."
        rows={6}
        disabled={isLoading}
        className="argument-textarea"
      />
      <button
        type="submit"
        disabled={isLoading || !argument.trim()}
        className="submit-button"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Argument'}
      </button>
    </form>
  );
}
