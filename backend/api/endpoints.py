from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
import logging
from typing import Optional, Dict
from models.database import get_db
from models.tables import SalaryRecord
from models.schemas import SalaryDataBase, SalaryAnalysis
from ai_service.gemini_analyzer import GeminiAnalyzer
from datetime import datetime

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/salary/analyze", response_model=SalaryAnalysis)
async def analyze_salary(
    data: SalaryDataBase,
    db: Session = Depends(get_db),
    detailed: bool = Query(False, description="Include detailed analysis")
):
    try:
        analyzer = GeminiAnalyzer()
        analysis_result = await analyzer.analyze_salary(data.dict())
        
        # Calculate additional metrics
        industry_avg = float(data.salary) * 1.1
        experience_factor = 1 + (data.experience * 0.05)
        experience_salary = float(data.salary) * experience_factor
        
        # Store analysis in database
        db_record = SalaryRecord(
            **data.dict(),
            analysis_result=analysis_result,
            created_at=datetime.utcnow()
        )
        db.add(db_record)
        db.commit()
        
        return SalaryAnalysis(
            average_salary=industry_avg,
            pay_gap=analysis_result["analysis"].get("pay_gap", 0),
            industry_average=industry_avg,
            experience_based_salary=experience_salary,
            gender_pay_gap=analysis_result["analysis"].get("gender_pay_gap", 0),
            market_position=analysis_result["analysis"].get("market_position", "average"),
            recommendations=analysis_result["recommendations"],
            industry_trends=analysis_result["market_insights"],
            created_at=datetime.utcnow()
        )
    except Exception as e:
        logger.error(f"Analysis failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/salary/statistics")
async def get_salary_statistics(
    industry: Optional[str] = None,
    location: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(SalaryRecord)
    if industry:
        query = query.filter(SalaryRecord.industry == industry)
    if location:
        query = query.filter(SalaryRecord.location == location)
    
    records = query.all()
    return {
        "count": len(records),
        "average_salary": sum(r.salary for r in records) / len(records) if records else 0,
        "gender_distribution": {
            "female": len([r for r in records if r.gender == "female"]),
            "male": len([r for r in records if r.gender == "male"]),
            "other": len([r for r in records if r.gender == "other"])
        }
    }

