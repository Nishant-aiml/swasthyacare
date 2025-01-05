import { useCallback } from 'react';

interface Suggestion {
  text: string;
  type: 'history' | 'trending' | 'ai';
  confidence: number;
}

export const useAI = () => {
  const getSuggestions = useCallback(async (query: string): Promise<Suggestion[]> => {
    // Mock AI suggestions - In a real app, this would call an AI service
    const mockSuggestions: Suggestion[] = [
      {
        text: `${query} exercises`,
        type: 'ai',
        confidence: 0.95,
      },
      {
        text: `${query} diet tips`,
        type: 'ai',
        confidence: 0.85,
      },
      {
        text: `${query} mental health`,
        type: 'ai',
        confidence: 0.75,
      },
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return mockSuggestions;
  }, []);

  const analyze = useCallback(async (text: string) => {
    // Mock AI analysis - In a real app, this would use an AI service
    return {
      sentiment: 'positive',
      topics: ['health', 'wellness'],
      urgency: 'low',
    };
  }, []);

  return {
    getSuggestions,
    analyze,
  };
};
