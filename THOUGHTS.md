# Development Reflections

## How did you use LLMs in your project?

LLMs are the core intelligence of this application, serving as the analytical engine that transforms user arguments into comprehensive, multi-faceted critiques. I integrated OpenAI's GPT-4 model through their official Node.js SDK, using it as an on-demand analysis service rather than a conversational agent. The key innovation is in the prompt engineering: I crafted a system prompt that positions the AI as an "expert critical thinker and debate coach," explicitly instructing it to generate steelman (not strawman) counterarguments and to avoid bias. The user prompt requests structured JSON output with five specific components (steelman counter, weak points, misconceptions, reinforcements, and opposing responses), ensuring consistent, parseable results every time. This structured approach treats the LLM as a specialized function that takes an argument string and returns a comprehensive analysis object, making the integration clean and predictable.

## What was the biggest challenge and how did you solve it?

The biggest challenge was ensuring reliable, structured output from the LLM that could be consistently parsed and displayed in the UI. Initially, I experimented with free-form text responses, but they were inconsistent in format and difficult to parse into the five distinct sections I needed. The breakthrough came from using OpenAI's JSON mode (response_format: { type: 'json_object' }), which guarantees the model will return valid JSON. However, this required careful prompt engineering to specify the exact schema I wanted, including field names, data types, and minimum item counts for arrays. I solved the parsing reliability issue by providing an explicit JSON template in the user prompt, showing the model exactly what structure to follow. Additionally, I added fallback empty values (|| '') in the parsing logic to handle any edge cases where the model might omit a field. This combination of JSON mode, explicit schema specification, and defensive parsing created a robust pipeline that has proven reliable across diverse argument types.

## If you had one more week, what would you improve or extend?

With an additional week, I would focus on three major improvements: First, implementing a comparison feature that allows users to analyze multiple versions of their argument side-by-side, helping them see how small changes affect the analysis and track their argumentation evolution. This would require adding a database (PostgreSQL) to store analyses and a UI for managing saved arguments. Second, I would add real-time streaming of the analysis results using OpenAI's streaming API and Server-Sent Events (SSE) on the backend, so users see results progressively rather than waiting 30 seconds for the full response—this would dramatically improve the perceived performance and user engagement. Third, I would implement topic-specific analysis modes (politics, science, philosophy, ethics) that adjust the system prompt to emphasize domain-relevant considerations; for example, a "science mode" might prioritize empirical evidence and methodological rigor, while a "ethics mode" would focus on moral frameworks and value conflicts. These improvements would transform the tool from a one-shot analyzer into a comprehensive argument development platform.

## Additional Reflection: What Surprised You?

What surprised me most was how much the quality of the analysis depended on the phrasing of the system prompt. Small changes—like explicitly saying "steelman, not strawman" and emphasizing "intellectual honesty"—had dramatic effects on the output quality. Initially, the AI would sometimes provide superficial counterarguments or agree too readily with the user's premise. By iterating on the prompt to emphasize the role of a "critical thinker" and "debate coach," I was able to get much more rigorous, adversarial analysis. This experience reinforced that prompt engineering is a genuine skill that requires experimentation and refinement, not just technical implementation. The difference between adequate and excellent LLM integration often comes down to these subtle prompt design choices rather than the model selection or API configuration.

## Lessons Learned

1. **Prompt Engineering is Iterative**: The first prompt rarely works perfectly; expect to refine based on output quality.

2. **Structured Output > Parsing**: Using JSON mode eliminates entire categories of parsing bugs and makes the system more maintainable.

3. **Separation of Concerns Matters**: Isolating the OpenAI service into its own module made it easy to iterate on prompts without touching routing or component code.

4. **TypeScript Type Safety Pays Off**: Having shared interfaces between frontend and backend caught several bugs during development that would have been runtime errors otherwise.

5. **Error Handling is Critical**: LLM APIs can fail in various ways (rate limits, timeouts, malformed responses)—robust error handling and user feedback are essential.

6. **User Experience > Technical Perfection**: The 30-second wait time is the biggest UX issue, more impactful than any code quality improvements. Streaming would be the highest-leverage improvement.
