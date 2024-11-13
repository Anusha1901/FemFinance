from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from .database import Base
from datetime import datetime

class SalaryRecord(Base):
    __tablename__ = "salary_records"

    id = Column(Integer, primary_key=True, index=True)
    job_title = Column(String, index=True)
    location = Column(String, index=True)
    industry = Column(String, index=True)
    experience = Column(Float)
    salary = Column(Float)
    gender = Column(String)
    analysis_result = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
