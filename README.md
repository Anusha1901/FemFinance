# FemFinance Analyzer
## Introduction
- FemFinance Analyzer is a dynamic web application created for the Women Techmakers She Builds AI Hackathon, addressing UN Sustainable Development Goal 5: Achieve gender equality and empower all women and girls.
- This project leverages Google's Gemini AI to provide data-driven salary analysis and career guidance, focusing on closing the gender pay gap and promoting workplace equality. Through transparent salary comparisons and personalized recommendations, FemFinance Analyzer empowers women to make informed career decisions and negotiate fair compensation.
- The platform combines cutting-edge AI technology with interactive visualizations to tackle workplace inequality head-on. By participating in this hackathon, we're contributing to the global effort of empowering women and girls through technology, specifically addressing salary equity and career advancement opportunities.
## Features
- Real-time salary analysis
- Industry benchmarking
- Gender pay gap visualization
- AI-powered career recommendations
- Interactive data visualization
- Experience-based growth projections
## Tech Stack
### Frontend
- React.js
- Material-UI
- Chart.js
- JavaScript/TypeScript
### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
### AI Integration
- Google Gemini AI
- RESTful APIs
## Testing Instruction
1. Clone repository
2. Install dependencies:
- cd frontend && npm install
- cd backend && pip install -r requirements.txt
3. Start backend server:
- cd backend && uvicorn main:app --reload
4. Start frontend:
- cd frontend && npm start
5. Access application at localhost:3000
## Code Logic
### Frontend Components
- Index: Handles user input and form validation
- VisualizationTab: Creates interactive charts using Chart.js
- AnalysisTab: Displays processed salary insights
- RecommendationsTab: Shows AI-generated career advice
### Backend Services
- FastAPI Router: Manages API endpoints and request handling
- GeminiAnalyzer: Processes salary data using AI
- Database Models: Handles data persistence and retrieval
## API Endpoints
- POST /api/v1/salary/analyze: Submit salary data for analysis
- GET /api/v1/salary/history: Retrieve analysis history
- GET /api/v1/salary/trends: Get industry trends
## Contributing
- Fork the repository
- Create your feature branch
- Commit your changes
- Push to the branch
- Create a Pull Request
## Links
- Watch the project in action: [Project Demo Video](https://vimeo.com/1029283886)
- Project Story: [Devpost](https://devpost.com/software/femfinance-analyzer?ref_content=my-projects-tab&ref_feature=my_projects)
