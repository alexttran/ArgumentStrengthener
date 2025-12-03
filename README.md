# Argument Strengthener

A tool that pressure-tests opinions and arguments by generating comprehensive analysis including steelman counterarguments, identifying weak points, exposing common misconceptions, and suggesting strategic reinforcement approaches.

## Project Description

When someone presents an argument, this tool analyzes it from multiple angles to help strengthen the position. Instead of simply agreeing or providing shallow critique, it generates:

1. **Steelman Counterarguments** - The strongest possible opposing argument (not a strawman)
2. **Weak Points** - Hidden vulnerabilities in the reasoning
3. **Common Misconceptions** - Frequently misunderstood aspects
4. **Reinforcement Strategies** - Ways to fortify the position
5. **Anticipated Opposition** - What critics are likely to say

The goal is to transform flimsy takes into bulletproof positions through rigorous AI-powered analysis.

## Track Chosen

General AI Application Track - Building a practical tool that uses LLMs for intellectual debate preparation and argument analysis.

## Step-by-Step Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend will run on http://localhost:3000

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on http://localhost:5173

4. Open your browser and navigate to http://localhost:5173

### Using the Application
1. Enter your argument or opinion in the text area
2. Click "Analyze Argument"
3. Wait for the AI analysis (typically 10-30 seconds)
4. Review the comprehensive analysis organized into five sections

## Technologies Used

### Frontend
- **React** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server-side code
- **OpenAI API** - GPT-4 for argument analysis
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing middleware

## How the LLM is Integrated

The application integrates OpenAI's GPT-4 (specifically the gpt-4-turbo-preview model) through the official OpenAI Node.js SDK. The integration follows this flow:

1. **User Input**: User submits an argument through the React frontend
2. **API Request**: Frontend sends POST request to `/api/analysis`
3. **Backend Processing**: Express route handler receives the argument
4. **LLM Call**: Backend constructs a prompt and calls OpenAI's Chat Completions API
5. **Response Parsing**: Backend parses the JSON-structured response
6. **Data Return**: Structured analysis is sent back to the frontend
7. **UI Display**: React components render the analysis in organized sections

The LLM is called on-demand for each analysis request, with no persistent state or conversation history.

## How Your Prompts are Structured

The prompt engineering strategy uses a two-part approach:

### System Prompt
Establishes the AI's role and guidelines:
```
You are an expert critical thinker and debate coach. Your job is to pressure-test
arguments by:
1. Creating the strongest possible counterargument (steelman, not strawman)
2. Identifying hidden weak points and vulnerabilities in the reasoning
3. Spotting common misconceptions or factual errors
4. Suggesting ways to reinforce and strengthen the position
5. Anticipating specific criticisms opponents might raise

Be intellectually honest, balanced, and thorough. Avoid bias and focus on logical analysis.
```

### User Prompt
Provides the argument and specifies the expected output format:
- Includes the user's argument verbatim
- Requests JSON-structured output with specific fields
- Specifies minimum item counts (at least 3 per category)
- Uses JSON mode to ensure parseable responses

This structure ensures:
- **Consistency**: Every response follows the same format
- **Completeness**: All five analysis components are included
- **Intellectual Honesty**: System prompt emphasizes steelman (not strawman) arguments
- **Parseability**: JSON mode guarantees machine-readable output

## Limitations and Assumptions

### Limitations
1. **Rate Limits**: Subject to OpenAI API rate limits and quotas
2. **Response Time**: Analysis takes 10-30 seconds depending on argument complexity
3. **Model Constraints**: Limited by the capabilities and biases of GPT-4
4. **No Context Retention**: Each analysis is independent; no conversation history
5. **Language**: Optimized for English-language arguments
6. **Cost**: Each analysis incurs OpenAI API costs

### Assumptions
1. **User Intent**: Assumes users genuinely want to strengthen their arguments, not just confirm bias
2. **Good Faith**: Assumes arguments submitted are made in good faith for intellectual exploration
3. **Network**: Assumes reliable internet connection for API calls
4. **Browser**: Assumes modern browser with ES6+ support
5. **Expertise Level**: Assumes users can understand and apply advanced argumentative concepts

### Known Issues
- No input sanitization for extremely long arguments (may hit token limits)
- No caching of similar arguments (each request is fresh)
- Error messages could be more specific about failure types

## AI Tools Used During Development

### Development Process
This project was developed with assistance from AI coding tools:

1. **Code Generation**: Initial project structure, boilerplate code, and component scaffolding
2. **Problem Solving**: Debugging environment variable loading issues and API integration
3. **Documentation**: Assistance with creating comprehensive documentation
4. **Best Practices**: Guidance on TypeScript patterns, React hooks, and Express middleware

### Specific Use Cases
- Structuring the TypeScript interfaces for type safety
- Crafting the system prompt for optimal LLM behavior
- Debugging CORS and proxy configuration issues
- Writing clear commit messages throughout development

The core prompt engineering strategy and application architecture were human-designed, with AI assistance for implementation details and code quality.
