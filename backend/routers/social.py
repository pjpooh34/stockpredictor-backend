from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from ..database import get_db
from ..models import User
from ..routers.auth import get_current_user

router = APIRouter()

class LeaderboardEntry(BaseModel):
    username: str
    accuracy: float
    total_predictions: int
    rank: int

@router.get("/leaderboard", response_model=List[LeaderboardEntry])
async def get_leaderboard(
    timeframe: str = "week",
    db: Session = Depends(get_db)
):
    # Mock leaderboard data
    return [
        LeaderboardEntry(username="trader123", accuracy=0.68, total_predictions=156, rank=1),
        LeaderboardEntry(username="stockpro", accuracy=0.65, total_predictions=203, rank=2),
        LeaderboardEntry(username="aitrader", accuracy=0.64, total_predictions=189, rank=3),
    ]

@router.get("/crowd-consensus/{ticker}")
async def get_crowd_consensus(
    ticker: str,
    db: Session = Depends(get_db)
):
    return {
        "ticker": ticker,
        "bullish_percentage": 65,
        "bearish_percentage": 35,
        "total_predictions": 1234,
        "average_confidence": 0.72
    }