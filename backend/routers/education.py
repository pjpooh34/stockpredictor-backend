from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from ..database import get_db
from ..models import User
from ..routers.auth import get_current_user

router = APIRouter()

class Course(BaseModel):
    id: int
    title: str
    description: str
    modules: int
    duration: str
    difficulty: str

class Achievement(BaseModel):
    id: int
    name: str
    description: str
    points: int
    earned: bool

@router.get("/courses", response_model=List[Course])
async def get_courses():
    return [
        Course(
            id=1,
            title="Understanding AI Predictions",
            description="Learn how our AI model makes predictions",
            modules=5,
            duration="2 hours",
            difficulty="beginner"
        ),
        Course(
            id=2,
            title="Advanced Trading Strategies",
            description="Combine AI predictions with technical analysis",
            modules=8,
            duration="4 hours",
            difficulty="advanced"
        )
    ]

@router.get("/achievements", response_model=List[Achievement])
async def get_achievements(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return [
        Achievement(
            id=1,
            name="First Prediction",
            description="Make your first AI prediction",
            points=10,
            earned=True
        ),
        Achievement(
            id=2,
            name="Winning Streak",
            description="Get 5 correct predictions in a row",
            points=50,
            earned=False
        )
    ]