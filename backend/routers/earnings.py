from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from ..database import get_db
from ..models import User
from ..routers.auth import get_current_user

router = APIRouter()

class EarningsPrediction(BaseModel):
    ticker: str
    earnings_date: str
    surprise_probability: float
    expected_move: float
    historical_accuracy: float

@router.get("/upcoming", response_model=List[EarningsPrediction])
async def get_upcoming_earnings(
    days: int = 7,
    db: Session = Depends(get_db)
):
    # Mock earnings data
    return [
        EarningsPrediction(
            ticker="AAPL",
            earnings_date="2024-01-25",
            surprise_probability=0.68,
            expected_move=4.5,
            historical_accuracy=0.72
        )
    ]

@router.get("/predict/{ticker}")
async def predict_earnings(
    ticker: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return {
        "ticker": ticker,
        "beat_probability": 0.65,
        "expected_eps": 1.45,
        "consensus_eps": 1.42,
        "historical_beats": "4/5 last quarters"
    }