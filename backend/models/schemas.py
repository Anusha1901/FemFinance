from pydantic import BaseModel,Field
from typing import Dict, List
from decimal import Decimal
from datetime import datetime

class SalaryDataBase(BaseModel):
    job_title: str
    location: str
    industry: str
    experience: float
    salary: float
    gender: str

class SalaryAnalysis(BaseModel):
    average_salary: float
    pay_gap: float
    industry_average: float
    experience_based_salary: float
    gender_pay_gap: float
    market_position: str
    recommendations: List[str]
    industry_trends: Dict[str, float]
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        schema_extra = {
            "example": {
                "average_salary": 75000,
                "pay_gap": 15.5,
                "industry_average": 80000,
                "experience_based_salary": 72000,
                "gender_pay_gap": 12.3,
                "market_position": "below_average",
                "recommendations": [
                    "Consider negotiating for a higher salary",
                    "Develop skills in emerging technologies"
                ],
                "industry_trends": {
                    "entry_level": 50000,
                    "mid_level": 75000,
                    "senior_level": 100000
                }
            }
        }