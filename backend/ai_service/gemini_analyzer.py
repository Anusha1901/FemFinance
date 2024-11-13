import google.generativeai as genai
from typing import Dict, List
import os
from dotenv import load_dotenv
import json
#import asyncio

load_dotenv()

class GeminiAnalyzer:
    def __init__(self):
        genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def analyze_salary(self, data: Dict) -> Dict:
        try:
            recommendation_prompt = f"""
            Generate specific career and salary recommendations for:
            - Role: {data['job_title']}
            - Industry: {data['industry']}
            - Experience: {data['experience']} years
            - Current Salary: ${data['salary']}
            - Gender: {data['gender']}
            
            Focus on:
            1. Salary negotiation strategies
            2. Career growth opportunities
            3. Industry-specific advice
            4. Gender equity considerations
            5. Skill development suggestions
            
            Return only a list of 5 specific, actionable recommendations.
            """
            
            recommendations_response = self.model.generate_content(recommendation_prompt)
            recommendations = recommendations_response.text.split('\n')
            recommendations = [rec.strip('- ').strip() for rec in recommendations if rec.strip()]

            base_salary = float(data["salary"])
            return {
                "analysis": {
                    "market_position": "average",
                    "pay_gap": self._calculate_pay_gap(data),
                    "gender_pay_gap": self._calculate_gender_pay_gap(data),
                    "industry_average": base_salary * 1.1,
                    "gender_average": base_salary * (0.95 if data["gender"].lower() == "female" else 1.05),
                    "salary_range": {
                        "min": base_salary * 0.8,
                        "max": base_salary * 1.2
                    }
                },
                "recommendations": recommendations[:5],
                "market_insights": {
                    "entry_level": base_salary * 0.7,
                    "mid_level": base_salary,
                    "senior_level": base_salary * 1.3
                }
            }
        except Exception as e:
            return self._generate_fallback_analysis(data)

    def _calculate_pay_gap(self, data: Dict) -> float:
        base_salary = float(data["salary"])
        industry_avg = base_salary * 1.1
        return round(((industry_avg - base_salary) / industry_avg) * 100, 2)

    def _calculate_gender_pay_gap(self, data: Dict) -> float:
        base_salary = float(data["salary"])
        if data["gender"].lower() == "female":
            return round(((base_salary * 1.2 - base_salary) / (base_salary * 1.2)) * 100, 2)
        return 0.0

    def _generate_fallback_analysis(self, data: Dict) -> Dict:
        base_salary = float(data["salary"])
        return {
            "analysis": {
                "market_position": "average",
                "pay_gap": self._calculate_pay_gap(data),
                "gender_pay_gap": self._calculate_gender_pay_gap(data),
                "industry_average": base_salary * 1.1,
                "gender_average": base_salary * (0.95 if data["gender"].lower() == "female" else 1.05),
                "salary_range": {
                    "min": base_salary * 0.8,
                    "max": base_salary * 1.2
                }
            },
            "recommendations": [
                f"Consider market research for {data['job_title']} roles in {data['industry']}",
                "Document your achievements and impact",
                "Build a strong professional network",
                "Research industry certifications",
                "Prepare for salary negotiations"
            ],
            "market_insights": {
                "entry_level": base_salary * 0.7,
                "mid_level": base_salary,
                "senior_level": base_salary * 1.3
            }
        }

