# Groundwater Portal Chatbot Module

## Overview

The Chatbot module is an intelligent assistant that helps users navigate the groundwater portal, apply for NOC, check eligibility, track applications, and understand compliance requirements.

## Features

✅ **Intent Detection** - Automatically detects user intent (NOC, Eligibility, Status, etc.)
✅ **Workflow Engine** - Guides users through step-by-step processes
✅ **Knowledge Base** - Answers questions from JSON/Excel data source
✅ **Quick Questions** - Predefined clickable questions for common tasks
✅ **Contextual Responses** - Provides relevant answers based on user queries
✅ **Workflow Integration** - Redirects users to appropriate portal sections

## File Structure

```
src/pages/Chatbot/
├── Chatbot.jsx              # Main chatbot component
├── ChatbotPage.jsx          # Standalone chatbot page
├── chatbotKnowledgeBase.json # Knowledge base (questions & answers)
├── chatbotUtils.js          # Utility functions
└── README.md               # This file
```

## Usage

### Basic Integration

The chatbot is automatically integrated into all portal pages via `PortalLayout`. It appears as a floating button in the bottom-right corner.

### Standalone Page

Access the standalone chatbot page at `/chatbot` route.

### Using in Components

```jsx
import Chatbot from './pages/Chatbot/Chatbot';

function MyComponent() {
  return (
    <div>
      {/* Your content */}
      <Chatbot />
    </div>
  );
}
```

## Knowledge Base Format

The knowledge base is stored in `chatbotKnowledgeBase.json` with the following structure:

```json
{
  "id": 1,
  "question": "Is NOC required for borewell?",
  "keywords": ["noc", "required", "borewell"],
  "intent": "eligibility",
  "answer": "NOC is required if...",
  "workflow": "eligibility",
  "buttons": [
    {
      "text": "Check Eligibility Now",
      "value": "check-eligibility"
    }
  ]
}
```

### Fields

- **id**: Unique identifier
- **question**: The question users might ask
- **keywords**: Array of keywords for matching
- **intent**: Intent category (noc, eligibility, status, etc.)
- **answer**: The answer text (supports markdown-like formatting)
- **workflow**: Associated workflow (optional)
- **buttons**: Action buttons (optional)

## Adding Questions/Answers

### Method 1: Edit JSON File

1. Open `chatbotKnowledgeBase.json`
2. Add a new entry:

```json
{
  "id": 13,
  "question": "What is the processing time?",
  "keywords": ["time", "processing", "duration", "days"],
  "intent": "status",
  "answer": "Processing time is typically 30-45 working days...",
  "workflow": null,
  "buttons": []
}
```

### Method 2: Excel/CSV Support (Future)

To use Excel/CSV files:

1. Install required library:
```bash
npm install xlsx
```

2. Update `chatbotUtils.js` to implement Excel reading
3. Convert Excel to JSON format matching the structure above

## Workflows

The chatbot supports the following workflows:

### 1. NOC Application (`noc`)
- Guides through purpose selection
- Location validation
- Water requirement calculation
- Document checklist
- Fee calculation

### 2. Eligibility Check (`eligibility`)
- Location-based eligibility
- Zone classification
- Requirement determination

### 3. Status Tracking (`status`)
- Application status check
- Officer remarks
- Timeline information

### 4. Rig Registration (`rig`)
- Rig registration process
- Redirects to rig portal

### 5. Meter Registration (`meter`)
- Meter registration process
- Redirects to meter portal

### 6. Payment (`payment`)
- Fee calculation
- Payment guidance

### 7. Compliance (`compliance`)
- Compliance requirements
- Renewal process
- Monitoring obligations

## Customization

### Styling

The chatbot uses inline styles. To customize:

1. Edit the `<style jsx>` block in `Chatbot.jsx`
2. Modify colors, sizes, positions as needed

### Adding New Workflows

1. Add workflow handler in `handleWorkflowStart()` function
2. Add workflow messages in `workflowMessages` object
3. Update intent detection if needed

### Adding New Intents

1. Update `detectIntent()` function
2. Add default response in `defaultResponses` object
3. Add knowledge base entries with matching intent

## Example Queries

Users can ask questions like:

- "I want to apply for NOC"
- "Is NOC required for borewell?"
- "Check my application status"
- "What documents are needed?"
- "How much is the fee?"
- "How to register rig?"
- "Compliance requirements"

## Integration with Portal

The chatbot integrates with portal routes:

- `/noc-portal` - NOC application
- `/rig-registration` - Rig registration
- `/meter-registration-system` - Meter registration
- `/compliance` - Compliance portal

## Future Enhancements

- [ ] Excel/CSV file reading
- [ ] AI-powered natural language understanding
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Chat history persistence
- [ ] Officer integration for real-time updates
- [ ] Analytics and usage tracking

## Support

For issues or questions about the chatbot module, please refer to the main portal documentation or contact the development team.

