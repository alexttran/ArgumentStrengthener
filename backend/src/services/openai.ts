/**
 * OpenAI Service
 *
 * Manages communication with OpenAI API
 * Constructs prompts and parses responses for argument analysis
 */

import OpenAI from 'openai';
import { AnalysisResult } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Analyzes an argument using OpenAI GPT-4
 * Generates steelman counterarguments, identifies weak points, misconceptions, etc.
 */
export async function analyzeArgument(argument: string): Promise<AnalysisResult> {
  const systemPrompt = `You are an expert critical thinker and debate coach. Your job is to pressure-test arguments by:
1. Creating the strongest possible counterargument (steelman, not strawman)
2. Identifying hidden weak points and vulnerabilities in the reasoning
3. Spotting common misconceptions or factual errors
4. Suggesting ways to reinforce and strengthen the position
5. Anticipating specific criticisms opponents might raise

Be intellectually honest, balanced, and thorough. Avoid bias and focus on logical analysis.`;

  const userPrompt = `Please analyze this argument comprehensively:

"${argument}"

Provide your analysis in the following JSON format:
{
  "steelmanCounter": "The strongest possible counterargument (2-3 paragraphs)...",
  "weakPoints": ["Weak point 1", "Weak point 2", "Weak point 3"],
  "misconceptions": ["Misconception 1", "Misconception 2", "Misconception 3"],
  "reinforcements": ["Reinforcement strategy 1", "Reinforcement strategy 2", "Reinforcement strategy 3"],
  "opposingResponses": ["Opposition response 1", "Opposition response 2", "Opposition response 3"]
}

Provide at least 3 items for each array field.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7
  });

  const responseText = completion.choices[0].message.content || '{}';
  const parsed = JSON.parse(responseText);

  return {
    originalArgument: argument,
    steelmanCounter: parsed.steelmanCounter || '',
    weakPoints: parsed.weakPoints || [],
    misconceptions: parsed.misconceptions || [],
    reinforcements: parsed.reinforcements || [],
    opposingResponses: parsed.opposingResponses || []
  };
}
