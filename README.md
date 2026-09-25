# GIA Rarity 2.0

Rebranded explorer for the same diamond rarity logic. The stone on the left is drawn and animated: choosing a shape swaps the outline, and the white facets gleam as a highlight travels across the stone.

## Features

- **Diamond Selection Interface**: Interactive sliders for selecting diamond attributes (Shape, Carat, Clarity, Color, Cut)
- **Rarity Calculations**: Built-in algorithms to calculate diamond rarity percentages
- **AI-Powered Analysis**: OpenAI integration for intelligent diamond analysis and recommendations
- **Responsive Design**: Modern UI with card-stack sliders and smooth animations

## OpenAI Integration

This application includes AI-powered features that provide intelligent analysis of diamond selections:

### Features
- **Diamond Analysis**: Get AI-generated insights about your selected diamond specifications
- **Educational Content**: AI explains diamond characteristics in simple terms
- **Rarity Assessment**: AI provides context about the rarity and value of selected diamonds

### Setup Instructions

1. **Get OpenAI API Key**:
   - Sign up at [OpenAI Platform](https://platform.openai.com/)
   - Create an API key in your dashboard
   - Copy your API key

2. **Configure Environment Variables**:
   ```bash
   # Edit .env.local file
   OPENAI_API_KEY=your_actual_api_key_here
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Access the Application**:
   - Open [http://localhost:3000](http://localhost:3000)
   - Select diamond attributes using the sliders
   - Click "Get AI Analysis" to receive AI-powered insights

## API Endpoints

### POST /api/openai
Handles OpenAI API requests for diamond analysis.

**Request Body:**
```json
{
  "action": "recommendation",
  "data": {
    "shape": "Round",
    "carat": "1.00-1.49",
    "clarity": "VS1",
    "color": "D",
    "cut": "Excellent"
  }
}
```

**Response:**
```json
{
  "result": "AI-generated analysis of the diamond..."
}
```

## Project Structure

```
src/
├── app/
│   ├── api/openai/route.ts    # OpenAI API endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page
├── components/
│   ├── AIAnalysis.tsx         # AI analysis component
│   ├── ShapeSelector.tsx      # Shape selection slider
│   ├── CaratSelector.tsx      # Carat selection slider
│   ├── ClaritySelector.tsx    # Clarity selection slider
│   ├── ColorSelector.tsx      # Color selection slider
│   └── CutSelector.tsx        # Cut selection slider
├── lib/
│   └── openai.ts              # OpenAI client and helpers
└── types/
    └── index.ts               # TypeScript type definitions
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **OpenAI API**: AI-powered analysis
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icons

## Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## AI Features

### Diamond Analysis
The AI provides comprehensive analysis including:
- Overall quality assessment
- Rarity factors
- Value considerations
- Notable features

### Educational Content
AI explains diamond characteristics:
- What each attribute means
- How it affects appearance
- Impact on value
- Quality scale positioning

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
