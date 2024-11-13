from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.endpoints import router
from models.database import Base, engine
from models.tables import SalaryRecord
from fastapi.responses import JSONResponse

app = FastAPI(
    title="Salary Equity Analyzer",
    description="API for analyzing salary data and gender pay gaps",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)

# Create database tables
async def startup():
    Base.metadata.create_all(bind=engine)

@app.get("/health")
async def health_check():
    return JSONResponse({"status": "healthy", "version": "1.0.0"})

app.include_router(router, prefix="/api/v1")

'''if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)'''
