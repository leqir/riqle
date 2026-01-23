#!/bin/bash

# Test Payment Flow Helper Script
# This script helps you test the complete payment flow

set -e

echo "🧪 Payment Flow Test Helper"
echo "============================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo "Please create a .env file based on .env.example"
    exit 1
fi

# Check required environment variables
echo -e "${BLUE}Checking environment variables...${NC}"

required_vars=(
    "DATABASE_URL"
    "STRIPE_SECRET_KEY"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    "STRIPE_WEBHOOK_SECRET"
    "NEXTAUTH_SECRET"
)

missing_vars=()
for var in "${required_vars[@]}"; do
    if ! grep -q "^$var=" .env; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo -e "${RED}❌ Missing required environment variables:${NC}"
    for var in "${missing_vars[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "Please update your .env file"
    exit 1
fi

echo -e "${GREEN}✅ All required environment variables present${NC}"
echo ""

# Check if Stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    echo -e "${RED}❌ Stripe CLI not found${NC}"
    echo "Install it with: brew install stripe/stripe-cli/stripe"
    exit 1
fi

echo -e "${GREEN}✅ Stripe CLI installed${NC}"
echo ""

# Kill any existing dev servers on port 3000
echo -e "${BLUE}Cleaning up existing processes...${NC}"
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
pkill -f "stripe listen" 2>/dev/null || true
sleep 2
echo -e "${GREEN}✅ Cleanup complete${NC}"
echo ""

# Start dev server
echo -e "${BLUE}Starting Next.js dev server...${NC}"
npm run dev &
DEV_PID=$!
echo "Dev server PID: $DEV_PID"

# Wait for server to start
echo "Waiting for server to start..."
for i in {1..30}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Dev server is ready!${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Dev server failed to start${NC}"
        kill $DEV_PID 2>/dev/null || true
        exit 1
    fi
    sleep 1
    echo -n "."
done
echo ""

# Start Stripe webhook listener
echo -e "${BLUE}Starting Stripe webhook listener...${NC}"
echo -e "${YELLOW}⚠️  Copy the webhook secret (whsec_...) and update your .env file${NC}"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Run stripe listen in foreground
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Cleanup on exit
trap "kill $DEV_PID 2>/dev/null || true" EXIT
