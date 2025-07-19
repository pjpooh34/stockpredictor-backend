# Deployment Guide for StockPredictor AI

This guide will help you deploy the StockPredictor AI platform to production.

## Quick Deployment Options

### 1. Railway (Easiest - Full Stack)

Railway provides a simple way to deploy the entire application with database and Redis.

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up

# Add PostgreSQL and Redis
railway add
# Select PostgreSQL and Redis from the menu

# Set environment variables in Railway dashboard
# Go to your project settings and add all variables from .env.example
```

### 2. Vercel (Frontend) + Railway (Backend)

This option gives you the best performance with Vercel's edge network for frontend.

#### Deploy Backend to Railway:

```bash
cd backend

# Create a new Railway project for backend
railway init

# Deploy backend
railway up

# Note your backend URL (e.g., https://your-app.railway.app)
```

#### Deploy Frontend to Vercel:

```bash
# Build the frontend
npm run build

# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod

# During deployment, add environment variable:
# VITE_API_URL = https://your-backend.railway.app
```

### 3. Docker Deployment (Self-Hosted)

For full control over your infrastructure:

```bash
# Build and run with Docker Compose
docker-compose up --build -d

# For production, use:
docker-compose -f docker-compose.prod.yml up --build -d
```

## Environment Setup

### Required Services

1. **PostgreSQL Database**
   - Railway provides this automatically
   - Or use Supabase, Neon, or AWS RDS

2. **Redis**
   - Railway provides this automatically
   - Or use Upstash Redis or AWS ElastiCache

3. **Stripe Account**
   - Sign up at https://stripe.com
   - Get your API keys from the dashboard
   - Set up webhook endpoint: https://your-domain.com/api/webhooks/stripe

### Environment Variables

Create these in your deployment platform:

```env
# CRITICAL - Must be set for production
NODE_ENV=production
SECRET_KEY=generate-a-secure-random-key-here
DATABASE_URL=your-database-url
REDIS_URL=your-redis-url

# Stripe (Required for payments)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_ELITE_PRICE_ID=price_...

# Email (Required for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password

# Optional but recommended
SENTRY_DSN=your-sentry-dsn
```

## Post-Deployment Steps

### 1. Run Database Migrations

```bash
# Railway
railway run alembic upgrade head

# Docker
docker-compose exec app alembic upgrade head
```

### 2. Create Admin User

```bash
# Connect to your production database
railway run python -m backend.scripts.create_admin
```

### 3. Configure Stripe Webhooks

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### 4. Set Up Monitoring

1. **Error Tracking**: Add Sentry
   ```bash
   npm install @sentry/react
   ```

2. **Analytics**: Add Posthog or Mixpanel
   ```bash
   npm install posthog-js
   ```

3. **Uptime Monitoring**: Use Better Uptime or Pingdom

### 5. Configure CDN (Optional)

For better performance, set up Cloudflare:

1. Add your domain to Cloudflare
2. Update DNS settings
3. Enable proxy for your domain
4. Set up page rules for caching

## Security Checklist

- [ ] Generate strong SECRET_KEY (min 32 characters)
- [ ] Enable HTTPS only
- [ ] Set secure CORS origins
- [ ] Enable rate limiting
- [ ] Configure firewall rules
- [ ] Set up backup automation
- [ ] Enable 2FA for all admin accounts
- [ ] Audit npm packages: `npm audit`
- [ ] Set up security headers

## Scaling Considerations

### When you reach 1000+ users:

1. **Database**: Enable connection pooling
2. **Redis**: Use Redis Cluster
3. **Backend**: Scale to multiple instances
4. **Frontend**: Already scaled via Vercel/CDN
5. **ML Model**: Consider GPU instances for predictions

### Performance Optimizations:

1. Enable database query caching
2. Implement Redis caching for predictions
3. Use CDN for all static assets
4. Enable gzip compression
5. Optimize images with next-gen formats

## Troubleshooting

### Common Issues:

1. **"Cannot connect to database"**
   - Check DATABASE_URL format
   - Ensure database is running
   - Check firewall rules

2. **"Stripe webhook failed"**
   - Verify webhook secret
   - Check endpoint URL
   - Review Stripe logs

3. **"Predictions timing out"**
   - Increase worker timeout
   - Check model loading
   - Monitor memory usage

### Getting Help:

1. Check logs:
   ```bash
   railway logs
   docker-compose logs -f app
   ```

2. Enable debug mode temporarily:
   ```env
   DEBUG=True
   LOG_LEVEL=DEBUG
   ```

3. Contact support with:
   - Error messages
   - Deployment method
   - Environment details

## Maintenance

### Weekly Tasks:
- Review error logs
- Check payment processing
- Monitor prediction accuracy
- Review user feedback

### Monthly Tasks:
- Update dependencies
- Review security alerts
- Analyze usage patterns
- Optimize database queries

### Quarterly Tasks:
- Retrain ML models
- Review infrastructure costs
- Plan feature updates
- Security audit

Remember to always test updates in a staging environment before deploying to production!