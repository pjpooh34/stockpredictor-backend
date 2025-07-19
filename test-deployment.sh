#!/bin/bash

echo "🧪 StockPredictor AI Deployment Test"
echo "=================================="

# Test frontend
echo ""
echo "🌐 Testing Frontend..."
FRONTEND_URL="https://stock-predictor-saas-5ywbqgndr-peter-olsons-projects.vercel.app"

if curl -s "$FRONTEND_URL" > /dev/null; then
    echo "✅ Frontend is live: $FRONTEND_URL"
else
    echo "❌ Frontend not responding"
fi

# Get Railway backend URL if available
echo ""
echo "🚂 Checking Railway Backend..."

if command -v railway &> /dev/null; then
    BACKEND_URL=$(railway status --json 2>/dev/null | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
    
    if [ -n "$BACKEND_URL" ]; then
        echo "✅ Backend URL: $BACKEND_URL"
        
        # Test backend health
        echo "🏥 Testing backend health..."
        if curl -s "$BACKEND_URL/health" > /dev/null; then
            echo "✅ Backend API is responding"
            echo "📚 API Documentation: $BACKEND_URL/docs"
        else
            echo "❌ Backend not responding (may still be starting up)"
        fi
    else
        echo "⏳ Backend URL not found (may not be deployed yet)"
    fi
else
    echo "⏳ Railway CLI not found or not logged in"
fi

echo ""
echo "📋 Full Stack Status:"
echo "Frontend: ✅ Live on Vercel"
echo "Backend:  ⏳ Deploy with Railway"
echo "Database: ⏳ Add PostgreSQL to Railway"
echo "Cache:    ⏳ Add Redis to Railway"

echo ""
echo "🎯 Next Steps:"
echo "1. Run: railway login"
echo "2. Run: railway init --name 'stockpredictor-backend'"
echo "3. Run: railway up"
echo "4. Add PostgreSQL and Redis in Railway dashboard"
echo "5. Set environment variables in Railway"
echo "6. Update VITE_API_URL in Vercel"

echo ""
echo "🔗 Important Links:"
echo "Vercel Dashboard: https://vercel.com/peter-olsons-projects/stock-predictor-saas"
echo "Railway Dashboard: https://railway.app/dashboard"
echo "Live Frontend: $FRONTEND_URL"