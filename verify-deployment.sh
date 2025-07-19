#!/bin/bash

echo "🔍 StockPredictor AI Deployment Verification"
echo "============================================"

# Get Railway URL
echo "📡 Checking Railway deployment..."
RAILWAY_URL=$(railway status --json 2>/dev/null | grep -o '"url":"[^"]*"' | cut -d'"' -f4)

if [ -n "$RAILWAY_URL" ]; then
    echo "✅ Railway Backend: $RAILWAY_URL"
    
    # Test backend health
    echo "🏥 Testing backend health..."
    if curl -s "$RAILWAY_URL/health" > /dev/null; then
        echo "✅ Backend is responding"
    else
        echo "❌ Backend not responding"
    fi
    
    # Test API documentation
    echo "📚 API Documentation: $RAILWAY_URL/docs"
    
else
    echo "❌ Railway URL not found. Make sure you've deployed to Railway."
fi

echo ""
echo "📋 Deployment Checklist:"
echo "[ ] Railway backend deployed"
echo "[ ] PostgreSQL added to Railway"  
echo "[ ] Redis added to Railway"
echo "[ ] Environment variables set in Railway"
echo "[ ] Vercel frontend deployed"
echo "[ ] VITE_API_URL set in Vercel"
echo "[ ] Stripe webhooks configured"
echo ""

echo "🔗 Important URLs:"
echo "Railway Dashboard: https://railway.app/dashboard"
echo "Vercel Dashboard: https://vercel.com/dashboard"
echo "Stripe Dashboard: https://dashboard.stripe.com/"
echo ""

echo "📧 Next Steps:"
echo "1. Set up Stripe webhooks: $RAILWAY_URL/api/webhooks/stripe"
echo "2. Test user registration and login"
echo "3. Test AI predictions"
echo "4. Configure custom domain (optional)"
echo "5. Start marketing! 🚀"