# StockPredictor AI - Institutional-Grade Stock Predictions for Retail Investors

AI-powered stock prediction platform with real-time analysis, portfolio sync, and smart alerts.

## Features

- **AI Predictions**: Time-GAN neural network with 62%+ accuracy
- **Portfolio Sync**: Connect Robinhood, TD Ameritrade, E*TRADE
- **Smart Alerts**: Real-time notifications for high-probability trades
- **Social Trading**: Leaderboards and community predictions
- **Backtesting**: Test strategies with historical data
- **Risk Management**: Kelly Criterion, position sizing, stop-loss optimization
- **Education Academy**: Learn AI trading strategies

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: FastAPI, Python, PostgreSQL, Redis
- **AI/ML**: TensorFlow, Time-GAN, scikit-learn
- **Infrastructure**: Docker, Railway/Vercel, AWS S3
- **Payments**: Stripe

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Redis 7+

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/stock-predictor-saas.git
cd stock-predictor-saas
```

2. Install dependencies:
```bash
# Frontend
npm install

# Backend
cd backend
pip install -r requirements.txt
cd ..
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the database:
```bash
docker-compose up -d postgres redis
```

5. Run migrations:
```bash
cd backend
alembic upgrade head
cd ..
```

6. Start the development servers:
```bash
# In one terminal - Backend
npm run backend

# In another terminal - Frontend
npm run dev
```

Visit http://localhost:5173

## Deployment

### Option 1: Railway (Recommended)

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and initialize:
```bash
railway login
railway init
```

3. Add services:
```bash
railway add
# Select PostgreSQL and Redis
```

4. Deploy:
```bash
railway up
```

### Option 2: Vercel + Railway

1. Deploy backend to Railway:
```bash
cd backend
railway up
```

2. Deploy frontend to Vercel:
```bash
npm run build
vercel --prod
```

3. Update `vercel.json` with your Railway backend URL

### Option 3: Docker

```bash
docker-compose up --build
```

### Environment Variables

Required environment variables:

```env
# Security
SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256

# Database
DATABASE_URL=postgresql://user:password@host/dbname

# Redis
REDIS_URL=redis://localhost:6379

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Firebase (for push notifications)
FIREBASE_SERVICE_ACCOUNT={}

# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## API Documentation

Once running, visit:
- API Docs: http://localhost:8000/docs
- API Redoc: http://localhost:8000/redoc

## Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
npm run test
```

## Production Checklist

- [ ] Set strong SECRET_KEY
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure CORS for your domain
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure rate limiting
- [ ] Set up backup strategy
- [ ] Configure CDN for static assets
- [ ] Set up email service
- [ ] Configure Stripe webhooks

## License

MIT

## Support

For issues and feature requests, please use GitHub Issues.