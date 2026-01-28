#!/bin/bash

# Production Setup Script
# Run this AFTER completing Stripe account activation

set -e

echo "🚀 Riqle Production Setup"
echo "========================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Must be run from project root"
    exit 1
fi

echo "⚠️  IMPORTANT: This script will help you go live with real payments!"
echo ""
echo "Before continuing, make sure you have:"
echo "  1. ✅ Completed Stripe account activation"
echo "  2. ✅ Added your bank account in Stripe"
echo "  3. ✅ Deployed your site to Vercel"
echo ""
read -p "Have you completed all the above? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please complete the prerequisites first"
    exit 1
fi

echo ""
echo "📋 Step 1: Get your live Stripe keys"
echo "------------------------------------"
echo "1. Go to: https://dashboard.stripe.com/apikeys (in LIVE mode)"
echo "2. Copy your 'Secret key' (starts with sk_live_)"
echo ""
read -p "Enter your LIVE secret key: " STRIPE_LIVE_SECRET
if [[ ! $STRIPE_LIVE_SECRET =~ ^sk_live_ ]]; then
    echo "❌ Error: Live secret key must start with 'sk_live_'"
    exit 1
fi

echo ""
read -p "Enter your LIVE publishable key (starts with pk_live_): " STRIPE_LIVE_PUB
if [[ ! $STRIPE_LIVE_PUB =~ ^pk_live_ ]]; then
    echo "❌ Error: Live publishable key must start with 'pk_live_'"
    exit 1
fi

echo ""
echo "📋 Step 2: Configure production webhook"
echo "---------------------------------------"
read -p "Enter your production URL (e.g., https://riqle.com): " PROD_URL
if [[ ! $PROD_URL =~ ^https:// ]]; then
    echo "❌ Error: Production URL must start with https://"
    exit 1
fi

echo ""
echo "Now create a webhook endpoint in Stripe:"
echo "1. Go to: https://dashboard.stripe.com/webhooks (in LIVE mode)"
echo "2. Click 'Add endpoint'"
echo "3. Set URL to: ${PROD_URL}/api/webhooks/stripe"
echo "4. Select events: checkout.session.completed, charge.refunded"
echo "5. Click 'Add endpoint'"
echo "6. Copy the 'Signing secret' (starts with whsec_)"
echo ""
read -p "Enter your webhook signing secret: " WEBHOOK_SECRET
if [[ ! $WEBHOOK_SECRET =~ ^whsec_ ]]; then
    echo "❌ Error: Webhook secret must start with 'whsec_'"
    exit 1
fi

echo ""
echo "📋 Step 3: Update Vercel environment variables"
echo "----------------------------------------------"
echo ""
echo "Run these commands to update Vercel environment variables:"
echo ""
echo "vercel env add STRIPE_SECRET_KEY production"
echo "# Paste: $STRIPE_LIVE_SECRET"
echo ""
echo "vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production"
echo "# Paste: $STRIPE_LIVE_PUB"
echo ""
echo "vercel env add STRIPE_WEBHOOK_SECRET production"
echo "# Paste: $WEBHOOK_SECRET"
echo ""
echo "vercel env add NEXT_PUBLIC_URL production"
echo "# Paste: $PROD_URL"
echo ""
read -p "Press enter when you've added all environment variables to Vercel..."

echo ""
echo "📋 Step 4: Deploy to production"
echo "-------------------------------"
echo "Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 Your payment system is now LIVE!"
echo ""
echo "Next steps:"
echo "1. Make a test purchase with a REAL credit card"
echo "2. Verify the entire flow works (payment, email, access)"
echo "3. Monitor your Stripe Dashboard: https://dashboard.stripe.com"
echo ""
echo "⚠️  Remember: You're now accepting REAL payments!"
