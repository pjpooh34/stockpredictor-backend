from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from ..database import get_db
from ..models import User
from ..routers.auth import get_current_user

router = APIRouter()

class OptionsFlowEntry(BaseModel):
    ticker: str
    strike: float
    expiry: str
    type: str
    volume: int
    premium: float
    is_unusual: bool

@router.get("/flow/{ticker}", response_model=List[OptionsFlowEntry])
async def get_options_flow(
    ticker: str,
    db: Session = Depends(get_db)
):
    # Mock options flow data
    return [
        OptionsFlowEntry(
            ticker=ticker,
            strike=150.0,
            expiry="2024-01-19",
            type="call",
            volume=5000,
            premium=250000,
            is_unusual=True
        )
    ]

@router.get("/unusual")
async def get_unusual_options(
    db: Session = Depends(get_db)
):
    return {
        "unusual_options": [
            {
                "ticker": "NVDA",
                "activity": "Large call sweep",
                "details": "$2M in 450C expiring next week"
            }
        ]
    }