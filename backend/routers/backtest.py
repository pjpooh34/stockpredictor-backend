from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from ..database import get_db
from ..models import User
from ..routers.auth import get_current_user

router = APIRouter()

class BacktestRequest(BaseModel):
    start_date: str
    end_date: str
    initial_capital: float
    confidence_threshold: float

class BacktestResult(BaseModel):
    total_return: float
    win_rate: float
    sharpe_ratio: float
    max_drawdown: float
    total_trades: int

@router.post("/run", response_model=BacktestResult)
async def run_backtest(
    request: BacktestRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Mock backtest results
    return BacktestResult(
        total_return=23.5,
        win_rate=0.624,
        sharpe_ratio=1.87,
        max_drawdown=-8.3,
        total_trades=156
    )