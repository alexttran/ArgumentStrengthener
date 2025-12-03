# Architecture Documentation

## System Architecture Diagram

```mermaid
graph TB
    subgraph "Frontend - React + Vite"
        A[User Browser] --> B[App.tsx]
        B --> C[ArgumentInput Component]
        B --> D[AnalysisResults Component]
        C --> E[API Service]
        D -.render.-> A
    end

    subgraph "Backend - Node.js + Express"
        E -->|POST /api/analysis| F[Express Router]
        F --> G[Analysis Route Handler]
        G --> H[OpenAI Service]
        H --> I[OpenAI API Client]
    end

    subgraph "External Services"
        I -->|Chat Completions API| J[OpenAI GPT-4]
        J -->|JSON Response| I
    end

    I --> H
    H --> G
    G --> F
    F -->|Analysis Result| E
    E --> B

    style A fill:#e1f5ff
    style J fill:#fff4e6
    style B fill:#f0f9ff
    style H fill:#fef3c7
```

## Component Breakdown

### Frontend Architecture

#### 1. App.tsx (Main Application)
**Purpose**: Root component that orchestrates the entire application state and flow.

**Responsibilities**:
- Manages application state (analysis result, loading state, errors)
- Coordinates communication between child components
- Handles API call lifecycle (loading, success, error states)
- Provides error handling and user feedback

**Key Design Decisions**:
- Uses React hooks (useState) for simple, functional state management
- No external state management library needed due to simple data flow
- Centralized error handling for better UX

#### 2. ArgumentInput Component
**Purpose**: Accepts user input and triggers analysis.

**Responsibilities**:
- Renders textarea for argument input
- Validates input (non-empty text)
- Manages local form state
- Provides visual feedback during loading
- Prevents duplicate submissions

**Key Features**:
- Controlled component pattern for predictable state
- Disabled state during API calls prevents race conditions
- Clear placeholder text guides user input

#### 3. AnalysisResults Component
**Purpose**: Displays the five-part analysis in a structured, readable format.

**Responsibilities**:
- Renders original argument for context
- Displays steelman counterargument
- Lists weak points, misconceptions, reinforcements, and opposing responses
- Applies color-coded styling for visual hierarchy
- Handles null state (no results yet)

**Key Features**:
- Conditional rendering (only shows when results exist)
- Semantic HTML structure (h2, ul, li)
- Color-coded sections for easy scanning

#### 4. API Service
**Purpose**: Abstracts backend communication from UI components.

**Responsibilities**:
- Constructs HTTP requests to backend
- Handles request/response transformation
- Provides error messages from failed requests
- Uses environment variables for configuration

**Benefits**:
- Separation of concerns (UI vs. network logic)
- Reusable across multiple components
- Easy to mock for testing

### Backend Architecture

#### 1. Express Server (server.ts)
**Purpose**: HTTP server that handles requests and serves the API.

**Responsibilities**:
- Initializes Express application
- Configures middleware (CORS, JSON parsing)
- Registers route handlers
- Loads environment variables
- Provides health check endpoint

**Key Configuration**:
- CORS enabled for frontend development (localhost:5173)
- JSON body parser for request payloads
- Port configuration via environment variables

#### 2. Analysis Route Handler (routes/analysis.ts)
**Purpose**: Handles the `/api/analysis` endpoint.

**Responsibilities**:
- Validates incoming requests (non-empty argument)
- Calls OpenAI service with validated input
- Catches and handles errors
- Returns JSON responses with appropriate status codes

**Error Handling**:
- 400 for invalid input (empty/missing argument)
- 500 for server errors (OpenAI failures)
- Descriptive error messages for debugging

#### 3. OpenAI Service (services/openai.ts)
**Purpose**: Encapsulates all OpenAI API interactions.

**Responsibilities**:
- Initializes OpenAI client with API key
- Constructs system and user prompts
- Makes API calls to GPT-4
- Parses JSON responses
- Transforms API responses into application types

**Prompt Structure**:
- **System Prompt**: Defines the AI's role and guidelines
- **User Prompt**: Provides the argument and output format specification
- **JSON Mode**: Ensures structured, parseable responses

**Design Benefits**:
- Single source of truth for prompt engineering
- Easy to update prompts without touching routes
- Centralized error handling for API failures

### Type System (TypeScript)

Both frontend and backend share similar TypeScript interfaces:

```typescript
interface AnalysisResult {
  originalArgument: string;
  steelmanCounter: string;
  weakPoints: string[];
  misconceptions: string[];
  reinforcements: string[];
  opposingResponses: string[];
}
```

**Benefits**:
- End-to-end type safety
- Compile-time error detection
- Better IDE support and autocomplete
- Self-documenting code

## Why This Design?

### 1. Separation of Concerns
Each component has a single, well-defined responsibility. Frontend handles presentation, backend handles business logic, and external service provides AI capabilities.

**Benefits**:
- Easier to test individual components
- Changes in one area don't cascade
- Clear ownership of functionality

### 2. React Component Architecture
Simple, flat component hierarchy with prop drilling.

**Why not Redux/Context?**
- Application state is simple (one analysis result)
- No complex state sharing across distant components
- Props are sufficient for current needs
- Avoids unnecessary complexity

### 3. Express Middleware Pattern
Standard Express architecture with routes and services.

**Benefits**:
- Familiar to Node.js developers
- Easy to extend with new routes
- Middleware composition for cross-cutting concerns

### 4. TypeScript Throughout
Both frontend and backend use TypeScript.

**Benefits**:
- Catch errors before runtime
- Shared type definitions ensure API contract adherence
- Better developer experience

### 5. Direct OpenAI Integration
No abstraction layer between our service and OpenAI.

**Why not wrap it?**
- OpenAI SDK is already well-designed
- Our use case is straightforward
- Premature abstraction adds complexity
- Easy to mock for testing if needed

## Trade-offs Made

### 1. No Database
**Decision**: Store nothing; each request is stateless.

**Trade-off**:
- ✅ Simpler architecture
- ✅ No data persistence concerns
- ✅ Easier to scale horizontally
- ❌ Can't save/compare analyses
- ❌ No usage tracking
- ❌ Can't implement caching

**Why**: For an MVP/demo, persistence adds complexity without clear benefit. Users can copy results if needed.

### 2. No Authentication
**Decision**: Public API, no user accounts.

**Trade-off**:
- ✅ Frictionless user experience
- ✅ No auth complexity
- ❌ Can't rate-limit by user
- ❌ API key exposure risk
- ❌ No personalization

**Why**: Focus on core functionality first. Authentication can be added later if needed.

### 3. Synchronous API Calls
**Decision**: Frontend waits for full response before displaying results.

**Trade-off**:
- ✅ Simpler implementation
- ✅ Atomic results (all or nothing)
- ❌ Long wait time (10-30 seconds)
- ❌ No progressive disclosure
- ❌ Can't show partial results

**Why**: OpenAI's API doesn't support streaming for JSON mode. Could implement streaming for better UX in future.

### 4. Client-Side Rendering Only
**Decision**: React SPA with no server-side rendering.

**Trade-off**:
- ✅ Simpler deployment
- ✅ Better local development experience
- ✅ Clear separation of concerns
- ❌ Slower initial page load
- ❌ SEO limitations
- ❌ No pre-rendered content

**Why**: This is a tool, not content. SEO isn't critical, and users expect interactivity.

### 5. Monolithic Backend
**Decision**: Single Express server handles all backend logic.

**Trade-off**:
- ✅ Simpler deployment
- ✅ No service coordination overhead
- ✅ Easier local development
- ❌ Can't scale components independently
- ❌ All logic in one process

**Why**: Current scale doesn't justify microservices complexity.

### 6. No Request Caching
**Decision**: Every request hits OpenAI's API fresh.

**Trade-off**:
- ✅ Always fresh results
- ✅ No cache invalidation logic
- ❌ Higher API costs
- ❌ Slower response times
- ❌ Duplicate work for similar arguments

**Why**: Each argument is likely unique. Caching similar arguments is complex and may not provide real value.

## Scalability Considerations

### Current Bottlenecks
1. **OpenAI API Rate Limits**: Limited by OpenAI's tier-based quotas
2. **Response Time**: GPT-4 takes 10-30 seconds per request
3. **Single Server**: No horizontal scaling yet

### Future Improvements
1. **Add Redis Caching**: Cache exact-match arguments
2. **Queue System**: Use Bull/BullMQ for background processing
3. **Load Balancing**: Multiple backend instances behind nginx
4. **Rate Limiting**: Implement per-IP or per-user rate limits
5. **Database**: Store analyses for comparison and tracking

## Security Considerations

### Current Measures
1. **Environment Variables**: API key not in code
2. **CORS**: Restricted to known frontend origin
3. **Input Validation**: Non-empty string check

### Future Improvements
1. **Input Sanitization**: Prevent injection attacks
2. **Rate Limiting**: Prevent abuse/DoS
3. **API Key Rotation**: Automated key rotation
4. **Request Size Limits**: Prevent resource exhaustion
5. **HTTPS**: Encrypt data in transit (for production)

## Deployment Architecture

### Development
- Frontend: Vite dev server (http://localhost:5173)
- Backend: tsx watch (http://localhost:3000)
- CORS: Enabled for localhost

### Production (Recommended)
- Frontend: Static build served via CDN or nginx
- Backend: Node.js server behind reverse proxy
- Database: PostgreSQL or Redis (if adding persistence)
- Environment: Containerized via Docker
- Orchestration: Docker Compose or Kubernetes

## Technology Choices Rationale

### Why React?
- Component-based architecture matches our UI structure
- Large ecosystem and community
- Excellent TypeScript support
- Familiar to most developers

### Why Vite?
- Faster than Create React App
- Better dev experience with HMR
- Modern tooling (ES modules)
- Great TypeScript support out of the box

### Why Express?
- De facto standard for Node.js APIs
- Minimal but extensible
- Large middleware ecosystem
- Well-documented and stable

### Why TypeScript?
- Catches errors at compile time
- Better IDE support
- Self-documenting code via types
- Easier refactoring

### Why OpenAI API?
- State-of-the-art language understanding
- JSON mode for structured output
- Reliable and well-documented
- Good balance of cost vs. quality
