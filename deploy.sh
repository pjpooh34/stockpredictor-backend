#!/bin/bash

echo "🚀 StockPredictor AI Deployment Script"
echo "======================================"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo ""
echo "📋 Deployment Steps:"
echo "1. Deploy backend to Railway"
echo "2. Add PostgreSQL and Redis"
echo "3. Set environment variables"
echo "4. Deploy frontend to Vercel"
echo ""

read -p "Do you want to continue? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

echo ""
echo "🔧 Step 1: Deploying backend to Railway..."
echo "This will open your browser for login if needed."
echo ""

# Deploy to Railway
railway login
railway init --name "stockpredictor-backend"
railway up

echo ""
echo "✅ Backend deployed! Please add PostgreSQL and Redis:"
echo "   railway add postgresql"
echo "   railway add redis"
echo ""

echo "🔧 Step 2: Setting up database..."
railway add postgresql
railway add redis

echo ""
echo "📝 Step 3: Please set these environment variables in Railway dashboard:"
echo ""
echo "Required variables:"
echo "NODE_ENV=production"
echo "SECRET_KEY=your-32-character-secret-key"
echo "STRIPE_SECRET_KEY=sk_live_..."
echo "STRIPE_WEBHOOK_SECRET=whsec_..."
echo "SMTP_USER=your-email@gmail.com"
echo "SMTP_PASSWORD=your-gmail-app-password"
echo ""

read -p "Press Enter after setting environment variables..."

echo ""
echo "🔧 Step 4: Building frontend..."
npm run build

echo ""
echo "🔧 Step 5: Deploying frontend to Vercel..."
echo "During deployment, set VITE_API_URL to your Railway backend URL"
echo ""

# Get Railway URL
RAILWAY_URL=$(railway status --json | jq -r '.deployments[0].url' 2>/dev/null)
if [ "$RAILWAY_URL" != "null" ] && [ "$RAILWAY_URL" != "" ]; then
    echo "Your Railway backend URL: $RAILWAY_URL"
    echo "Set VITE_API_URL=$RAILWAY_URL in Vercel"
fi

vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Post-deployment checklist:"
echo "✅ Backend deployed to Railway"
echo "✅ Frontend deployed to Vercel"
echo "⏳ Set up Stripe webhooks"
echo "⏳ Configure custom domain"
echo "⏳ Test all features"
echo ""
echo "🔗 Important URLs:"
echo "Frontend: Check Vercel dashboard"
echo "Backend: Check Railway dashboard"
echo "API Docs: {backend-url}/docs"
echo ""