'use client';

import { useState } from 'react';
import { SelectionState } from '@/types';
import { overlayImageForShape } from '@/lib/shape-images';

interface AIAnalysisProps {
  selections: SelectionState;
}

export default function AIAnalysis({ selections }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const shapeImage = overlayImageForShape(selections.selectedShape);

  const handleAIClick = async () => {
    if (
      !selections.selectedShape ||
      !selections.selectedCarat ||
      !selections.selectedClarity ||
      !selections.selectedColor ||
      !selections.selectedCut
    ) {
      setError('Please select all diamond attributes first.');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis('');

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'recommendation',
          data: {
            shape: selections.selectedShape,
            carat: selections.selectedCarat,
            clarity: selections.selectedClarity,
            color: selections.selectedColor,
            cut: selections.selectedCut,
          },
        }),
      });

      const data = await response.json();
      if (data.result) {
        setAnalysis(data.result);
        return;
      }
      throw new Error(data.error || 'Failed to get AI analysis');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to get AI analysis';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-analysis-section">
      <div className="ai-header">
        <img
          className="ai-shape"
          src={shapeImage}
          alt={selections.selectedShape || 'Diamond'}
        />
        <h3>AI Diamond Analysis</h3>
        <button
          type="button"
          onClick={handleAIClick}
          className="ai-button"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Get AI Analysis'}
        </button>
      </div>

      {error && (
        <div className="ai-error">
          <p>{error}</p>
        </div>
      )}

      {analysis && (
        <div className="ai-result">
          {analysis.split('\n').map((paragraph, index) =>
            paragraph ? (
              <p key={index}>{paragraph}</p>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
