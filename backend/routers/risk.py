from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from ..database import get_db
from ..models import User
from ..routers.auth import get_current_user

router = APIRouter()

class RiskAnalysis(BaseModel):
    portfolio_risk_score: float
    position_sizes: dict
    recommended_stops: dict
    correlation_risk: str

@router.post("/analyze", response_model=RiskAnalysis)
async def analyze_risk(
    positions: List[dict],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Mock risk analysis
    return RiskAnalysis(
        portfolio_risk_score=6.5,
        position_sizes={"AAPL": 0.15, "MSFT": 0.12},
        recommended_stops={"AAPL": 175.50, "MSFT": 380.25},
        correlation_risk="moderate"
    )

@router.get("/kelly-criterion/{ticker}")
async def calculate_kelly(
    ticker: str,
    win_probability: float,
    current_user: User = Depends(get_current_user)
):
    kelly_percentage = (win_probability - (1 - win_probability)) / 1
    return {
        "ticker": ticker,
        "kelly_percentage": max(0, min(0.25, kelly_percentage)),
        "recommended_position_size": f"{kelly_percentage * 100:.1f}%"
    }