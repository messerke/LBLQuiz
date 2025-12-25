# 🗄️ Vercel KV Setup for Shared Leaderboard

The quiz now uses **Vercel KV** (Redis-based key-value store) to share the leaderboard across all users!

## 📋 Setup Steps

### 1. Deploy to Vercel (if not already deployed)

```bash
# Push your code to GitHub first
git add .
git commit -m "Add shared leaderboard with Vercel KV"
git push

# Then deploy via Vercel dashboard or CLI
# Go to: https://vercel.com/new
# Import your GitHub repository
```

### 2. Create a Vercel KV Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **Storage** in the top menu
3. Click **Create Database**
4. Select **KV** (Key-Value Store)
5. Give it a name like `lbl-quiz-leaderboard`
6. Choose a region close to your users
7. Click **Create**

### 3. Connect KV to Your Project

1. After creating the database, you'll see a page with connection details
2. Click on **Connect Project**
3. Select your `lbl-quiz` project
4. Click **Connect**

Vercel will automatically add the environment variables to your project!

### 4. For Local Development (Optional)

If you want to test the shared leaderboard locally:

1. In your Vercel KV database page, click on the `.env.local` tab
2. Copy all the environment variables shown
3. Paste them into your local `.env.local` file
4. Restart your dev server: `npm run dev`

**Example variables:**
```
KV_URL="redis://..."
KV_REST_API_URL="https://..."
KV_REST_API_TOKEN="..."
KV_REST_API_READ_ONLY_TOKEN="..."
```

### 5. Deploy Your Changes

```bash
# If you made changes, push to trigger a new deployment
git push

# Or redeploy from Vercel dashboard
```

## ✅ Verify It's Working

1. Visit your deployed quiz
2. Play the game and save a score
3. Open the site in a different browser or incognito window
4. Check the leaderboard - you should see the score from step 2!

## 💰 Pricing

Vercel KV free tier includes:
- 30,000 commands per month
- 256 MB storage
- Perfect for small apps like this quiz!

## 🔧 Troubleshooting

### "Failed to save score" error
- Make sure you've connected the KV database to your Vercel project
- Check the Vercel deployment logs for errors
- Verify environment variables are set in Vercel dashboard

### Leaderboard not loading
- Check browser console for errors
- Verify the API route is working: visit `your-domain.vercel.app/api/leaderboard`
- Should return `[]` or your leaderboard data

### Local development not working
- Make sure you copied all 4 environment variables to `.env.local`
- Restart your dev server after adding env variables
- Check that `.env.local` is in the root directory

## 📝 How It Works

- **API Route:** `/app/api/leaderboard/route.ts` handles GET (fetch) and POST (save) requests
- **Storage:** Scores are stored in Vercel KV under the key `lbl-quiz-leaderboard`
- **Data Format:** Array of top 5 scores: `[{name, score, date}, ...]`
- **Automatic Sorting:** API automatically keeps only top 5 highest scores

Enjoy your globally shared leaderboard! 🎄🏆
