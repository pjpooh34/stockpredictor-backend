# 🚀 Railway + Vercel Deployment Guide

Deploy StockPredictor AI with Railway (backend) + Vercel (frontend) for optimal performance.

## Quick Deploy (5 minutes)

### Step 1: Deploy Backend to Railway

```bash
cd ~/Downloads/stock-predictor-saas

# Login to Railway (opens browser)
railway login

# Create and deploy project
railway init
railway up
```

### Step 2: Add Database Services

```bash
# Add PostgreSQL database
railway add postgresql

# Add Redis cache
railway add redis
```

### Step 3: Set Environment Variables

Go to Railway dashboard → Your Project → Variables tab and add:

```env
NODE_ENV=production
SECRET_KEY=your-super-secure-32-character-secret-key-here
ALLOWED_ORIGINS=["https://your-domain.vercel.app"]

# Database URLs (auto-generated by Railway)
# DATABASE_URL and REDIS_URL will be set automatically

# Stripe (from stripe.com dashboard)
STRIPE_SECRET_KEY=sk_live_51...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_1...
STRIPE_ELITE_PRICE_ID=price_1...

# Email settings (Gmail recommended)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password

# Optional: AWS for file storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
S3_BUCKET=stockpredictor-assets
```

### Step 4: Note Your Backend URL

After Railway deployment, you'll get a URL like:
`https://stockpredictor-production.up.railway.app`

### Step 5: Deploy Frontend to Vercel

```bash
# Build the frontend
npm run build

# Deploy to Vercel
vercel --prod
```

During Vercel setup, add environment variable:
- `VITE_API_URL` = `https://your-railway-app.railway.app`

## Detailed Configuration

### Railway Backend Setup

1. **Create Railway Project**
   ```bash
   railway init --name "stockpredictor-backend"
   ```

2. **Deploy Code**
   ```bash
   railway up
   ```

3. **Add Services**
   ```bash
   railway add postgresql
   railway add redis
   ```

4. **Check Deployment**
   ```bash
   railway status
   railway logs
   ```

### Vercel Frontend Setup

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-railway-url.railway.app`

4. **Custom Domain** (Optional)
   - Add your domain in Vercel dashboard
   - Update DNS records as shown

## Environment Variables Reference

### Railway (Backend)

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Set to `production` | ✅ |
| `SECRET_KEY` | JWT secret (32+ chars) | ✅ |
| `DATABASE_URL` | PostgreSQL URL (auto) | ✅ |
| `REDIS_URL` | Redis URL (auto) | ✅ |
| `STRIPE_SECRET_KEY` | Stripe API key | ✅ |
| `SMTP_USER` | Email username | ✅ |
| `SMTP_PASSWORD` | Email password | ✅ |

### Vercel (Frontend)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Railway backend URL | ✅ |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe public key | ✅ |

## Post-Deployment Setup

### 1. Test the APIs

```bash
# Test backend health
curl https://your-railway-app.railway.app/health

# Test frontend
curl https://your-vercel-app.vercel.app
```

### 2. Configure Stripe Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-railway-app.railway.app/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### 3. Set Up Domain (Optional)

**For Vercel:**
1. Add custom domain in Vercel dashboard
2. Update DNS records as instructed

**For Railway:**
1. Go to Railway dashboard → Settings
2. Add custom domain
3. Update DNS records

### 4. Enable HTTPS

Both Railway and Vercel provide automatic HTTPS with Let's Encrypt certificates.

## Monitoring & Debugging

### Railway Logs
```bash
railway logs --tail
```

### Vercel Logs
- Go to Vercel dashboard → Functions tab
- View real-time logs

### Health Checks

- Backend: `https://your-railway-app.railway.app/health`
- Frontend: `https://your-vercel-app.vercel.app`
- API Docs: `https://your-railway-app.railway.app/docs`

## Scaling

### Railway
- Automatically scales based on traffic
- Can upgrade to Pro plan for more resources

### Vercel
- Edge network provides global CDN
- Automatic scaling included

## Costs

### Railway
- Hobby Plan: $5/month (sufficient for MVP)
- Pro Plan: $20/month (for production)

### Vercel
- Hobby Plan: Free (perfect for frontend)
- Pro Plan: $20/month (for teams)

**Total MVP Cost: ~$5-10/month**

## Troubleshooting

### Common Issues

1. **"Cannot connect to database"**
   - Check DATABASE_URL in Railway variables
   - Ensure PostgreSQL service is running

2. **"CORS error"**
   - Add your Vercel domain to ALLOWED_ORIGINS in Railway
   - Format: `["https://your-app.vercel.app"]`

3. **"API not found"**
   - Check VITE_API_URL in Vercel settings
   - Ensure Railway app is deployed and running

4. **"Stripe webhooks failing"**
   - Verify webhook URL in Stripe dashboard
   - Check STRIPE_WEBHOOK_SECRET

### Debug Commands

```bash
# Railway
railway logs --tail
railway status
railway vars

# Vercel
vercel logs
vercel env ls
```

## Success Checklist

- [ ] Railway backend deployed and running
- [ ] PostgreSQL and Redis added to Railway
- [ ] Environment variables set in Railway
- [ ] Vercel frontend deployed
- [ ] VITE_API_URL set in Vercel
- [ ] Stripe webhooks configured
- [ ] Health endpoints responding
- [ ] Authentication working
- [ ] Database migrations run
- [ ] Custom domain configured (optional)

## Next Steps

1. **Test all features** thoroughly
2. **Set up monitoring** (Sentry, LogRocket)
3. **Configure backup** strategy
4. **Plan marketing** launch
5. **Monitor performance** and scale as needed

Your StockPredictor AI platform is now live and ready for users! 🎉