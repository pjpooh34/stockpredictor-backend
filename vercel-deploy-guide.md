# 🚀 Vercel Frontend Deployment Guide

## Step 1: Login to Vercel

```bash
cd ~/Downloads/stock-predictor-saas
vercel login
```

## Step 2: Deploy to Vercel

```bash
vercel --prod
```

**Answer the prompts:**
- **Set up and deploy?** → `Y`
- **Which scope?** → Choose your personal account or team
- **Link to existing project?** → `N` (for new deployment)
- **What's your project's name?** → `stockpredictor-ai` (or your preferred name)
- **In which directory is your code located?** → `./` (current directory)

## Step 3: Set Environment Variables

After deployment, go to Vercel Dashboard and add these environment variables:

### Required Environment Variables:

1. Go to https://vercel.com/dashboard
2. Select your `stockpredictor-ai` project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```env
VITE_API_URL=https://your-railway-backend-url.railway.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

## Step 4: Redeploy with Environment Variables

After setting environment variables, trigger a new deployment:

```bash
vercel --prod
```

## Step 5: Verify Deployment

Your frontend will be available at:
`https://stockpredictor-ai.vercel.app` (or your custom domain)

### Quick Tests:
1. **Landing Page**: Should load with all styling
2. **Registration**: Should work (creates account via Railway backend)
3. **Login**: Should authenticate successfully
4. **Dashboard**: Should show user interface

## Step 6: Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., `stockpredictor.ai`)
3. Update DNS records as instructed by Vercel
4. SSL certificate will be automatically provisioned

## Troubleshooting

### Common Issues:

1. **"Cannot connect to API"**
   - Check `VITE_API_URL` in Vercel environment variables
   - Ensure Railway backend is running

2. **"CORS Error"**
   - Add your Vercel domain to `ALLOWED_ORIGINS` in Railway
   - Format: `["https://your-app.vercel.app"]`

3. **"Build Failed"**
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in package.json

### Useful Commands:

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Set environment variable via CLI
vercel env add VITE_API_URL

# Remove deployment
vercel rm stockpredictor-ai
```

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Gzip compression
- ✅ Edge caching

## Monitoring

1. **Analytics**: Enable in Vercel Dashboard → Analytics
2. **Speed Insights**: Enable in Vercel Dashboard → Speed Insights
3. **Real User Monitoring**: Available in Pro plan

Your frontend is now live and optimized! 🎉