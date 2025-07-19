#!/bin/bash

echo "🚀 Starting StockPredictor AI Backend..."

# Install dependencies
echo "📦 Installing Python dependencies..."
cd backend && pip install -r requirements.txt && cd ..

# Run database migrations (if DATABASE_URL is available)
if [ ! -z "$DATABASE_URL" ]; then
    echo "🗄️ Running database migrations..."
    cd backend && alembic upgrade head && cd ..
fi

# Start the application
echo "🎯 Starting FastAPI server..."
uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}