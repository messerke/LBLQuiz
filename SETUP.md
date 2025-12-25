# 🎁 Quick Setup Guide

## Step 1: Add Your Images

1. Go to the `public/images/` folder
2. Add your images with these exact names:
   - `lady-1.jpg`, `lady-2.jpg`, `lady-3.jpg`, etc.
   - `ladyboy-1.jpg`, `ladyboy-2.jpg`, `ladyboy-3.jpg`, etc.

3. **IMPORTANT:** Update the image count in `app/page.tsx`:
   ```typescript
   // Find lines 11-12 and update these numbers:
   const ladyCount = 20    // Your total number of lady images
   const ladyboyCount = 20 // Your total number of ladyboy images
   ```

## Step 2: Install and Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:3000 to see your quiz!

## Step 3: Deploy to Vercel

```bash
# Build the project
npm run build

# Push to GitHub, then:
# 1. Go to vercel.com
# 2. Import your repository
# 3. Deploy (Vercel auto-detects Next.js)
```

## Step 4: Enable Shared Leaderboard (Optional but Recommended!)

To share scores across all users:

1. Go to [Upstash for Vercel](https://vercel.com/marketplace/upstash)
2. Click "Add Integration" → Select your project
3. Create a Redis database (free tier!)
4. Connect to your project
5. Redeploy

**See detailed instructions:** [UPSTASH_REDIS_SETUP.md](UPSTASH_REDIS_SETUP.md)

## That's it! 🎅

Your Christmas quiz is ready to play!
