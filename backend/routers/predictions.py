from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Optional
from pydantic import BaseModel
import yfinance as yf
import numpy as np
from random import random

from ..database import get_db
from ..models import User, Prediction, PredictionDirection
from ..routers.auth import get_current_user
from ..config import settings

router = APIRouter()

class PredictionRequest(BaseModel):
    ticker: str
    timeframe: str = "1d"  # 1d, 1w, 1m

class PredictionResponse(BaseModel):
    ticker: str
    direction: str
    probability: float
    confidence: float
    timeframe: str
    features: dict
    target_price: Optional[float]
    stop_loss: Optional[float]
    created_at: datetime

class HistoricalPrediction(BaseModel):
    id: int
    ticker: str
    direction: str
    probability: float
    confidence: float
    timeframe: str
    created_at: datetime
    target_price: Optional[float]
    stop_loss: Optional[float]

def calculate_technical_indicators(ticker: str):
    """Calculate technical indicators for prediction"""
    try:
        stock = yf.Ticker(ticker)
        hist = stock.history(period="3mo")
        
        if hist.empty:
            return None
            
        # Calculate indicators
        close_prices = hist['Close'].values
        volumes = hist['Volume'].values
        
        # RSI
        price_diff = np.diff(close_prices)
        gains = price_diff[price_diff > 0].sum()
        losses = -price_diff[price_diff < 0].sum()
        rs = gains / losses if losses > 0 else 1
        rsi = 100 - (100 / (1 + rs))
        
        # Moving averages
        ma_20 = np.mean(close_prices[-20:]) if len(close_prices) >= 20 else np.mean(close_prices)
        ma_50 = np.mean(close_prices[-50:]) if len(close_prices) >= 50 else np.mean(close_prices)
        
        # Volume ratio
        avg_volume = np.mean(volumes)
        volume_ratio = volumes[-1] / avg_volume if avg_volume > 0 else 1
        
        # Price position
        price_position = (close_prices[-1] - min(close_prices)) / (max(close_prices) - min(close_prices))
        
        return {
            "rsi": round(rsi, 2),
            "ma_20": round(ma_20, 2),
            "ma_50": round(ma_50, 2),
            "volume_ratio": round(volume_ratio, 2),
            "price_position": round(price_position, 2),
            "current_price": round(close_prices[-1], 2),
            "volatility": round(np.std(price_diff) if len(price_diff) > 0 else 0, 4)
        }
    except:
        return None

def generate_prediction(ticker: str, timeframe: str, features: dict):
    """Generate AI prediction (simulated for demo)"""
    # In production, this would call your actual ML model
    # For demo, we'll use feature-based logic
    
    rsi = features.get("rsi", 50)
    price_position = features.get("price_position", 0.5)
    volume_ratio = features.get("volume_ratio", 1)
    
    # Simulated prediction logic
    base_probability = 0.5
    
    # RSI influence
    if rsi < 30:
        base_probability += 0.15  # Oversold
    elif rsi > 70:
        base_probability -= 0.15  # Overbought
        
    # Price position influence
    if price_position < 0.3:
        base_probability += 0.1
    elif price_position > 0.7:
        base_probability -= 0.1
        
    # Volume influence
    if volume_ratio > 1.5:
        base_probability += 0.05
        
    # Add some randomness for demo
    base_probability += (random() - 0.5) * 0.1
    
    # Ensure probability is between 0 and 1
    probability = max(0.1, min(0.9, base_probability))
    
    # Determine direction
    direction = PredictionDirection.UP if probability > 0.5 else PredictionDirection.DOWN
    
    # Calculate confidence (higher when probability is further from 0.5)
    confidence = abs(probability - 0.5) * 2
    
    # Calculate target and stop loss
    current_price = features.get("current_price", 100)
    volatility = features.get("volatility", 0.02)
    
    if direction == PredictionDirection.UP:
        target_price = current_price * (1 + volatility * 2)
        stop_loss = current_price * (1 - volatility)
    else:
        target_price = current_price * (1 - volatility * 2)
        stop_loss = current_price * (1 + volatility)
    
    return {
        "direction": direction,
        "probability": round(probability, 3),
        "confidence": round(confidence, 3),
        "target_price": round(target_price, 2),
        "stop_loss": round(stop_loss, 2)
    }

@router.post("/predict", response_model=PredictionResponse)
async def create_prediction(
    request: PredictionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check rate limits
    today_predictions = db.query(Prediction).filter(
        Prediction.user_id == current_user.id,
        Prediction.created_at >= datetime.utcnow() - timedelta(days=1)
    ).count()
    
    rate_limits = {
        "free": settings.RATE_LIMIT_FREE,
        "pro": settings.RATE_LIMIT_PRO,
        "elite": settings.RATE_LIMIT_ELITE
    }
    
    user_limit = rate_limits.get(current_user.subscription_tier.value, 50)
    
    if today_predictions >= user_limit:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Daily prediction limit reached ({user_limit}/day for {current_user.subscription_tier.value} tier)"
        )
    
    # Calculate technical indicators
    features = calculate_technical_indicators(request.ticker)
    if not features:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unable to fetch data for ticker {request.ticker}"
        )
    
    # Generate prediction
    prediction_data = generate_prediction(request.ticker, request.timeframe, features)
    
    # Save to database
    db_prediction = Prediction(
        user_id=current_user.id,
        ticker=request.ticker.upper(),
        direction=prediction_data["direction"],
        probability=prediction_data["probability"],
        confidence=prediction_data["confidence"],
        timeframe=request.timeframe,
        features=features,
        target_price=prediction_data["target_price"],
        stop_loss=prediction_data["stop_loss"]
    )
    
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)
    
    return PredictionResponse(
        ticker=db_prediction.ticker,
        direction=db_prediction.direction.value,
        probability=db_prediction.probability,
        confidence=db_prediction.confidence,
        timeframe=db_prediction.timeframe,
        features=db_prediction.features,
        target_price=db_prediction.target_price,
        stop_loss=db_prediction.stop_loss,
        created_at=db_prediction.created_at
    )

@router.get("/history", response_model=List[HistoricalPrediction])
async def get_prediction_history(
    skip: int = 0,
    limit: int = 50,
    ticker: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Prediction).filter(Prediction.user_id == current_user.id)
    
    if ticker:
        query = query.filter(Prediction.ticker == ticker.upper())
    
    predictions = query.order_by(Prediction.created_at.desc()).offset(skip).limit(limit).all()
    
    return [
        HistoricalPrediction(
            id=p.id,
            ticker=p.ticker,
            direction=p.direction.value,
            probability=p.probability,
            confidence=p.confidence,
            timeframe=p.timeframe,
            created_at=p.created_at,
            target_price=p.target_price,
            stop_loss=p.stop_loss
        )
        for p in predictions
    ]

@router.get("/stats")
async def get_prediction_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get user's prediction statistics
    total_predictions = db.query(Prediction).filter(
        Prediction.user_id == current_user.id
    ).count()
    
    today_predictions = db.query(Prediction).filter(
        Prediction.user_id == current_user.id,
        Prediction.created_at >= datetime.utcnow() - timedelta(days=1)
    ).count()
    
    # Get most predicted tickers
    from sqlalchemy import func
    top_tickers = db.query(
        Prediction.ticker,
        func.count(Prediction.id).label('count')
    ).filter(
        Prediction.user_id == current_user.id
    ).group_by(
        Prediction.ticker
    ).order_by(
        func.count(Prediction.id).desc()
    ).limit(5).all()
    
    return {
        "total_predictions": total_predictions,
        "predictions_today": today_predictions,
        "daily_limit": {
            "free": settings.RATE_LIMIT_FREE,
            "pro": settings.RATE_LIMIT_PRO,
            "elite": settings.RATE_LIMIT_ELITE
        }[current_user.subscription_tier.value],
        "top_tickers": [{"ticker": t[0], "count": t[1]} for t in top_tickers]
    }