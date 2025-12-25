# 🗄️ Upstash Redis Setup for Shared Leaderboard

The quiz uses **Upstash Redis** (via Vercel Marketplace) to share the leaderboard across all users!

**Note:** Vercel KV has been sunset. We now use Upstash Redis, which is fully compatible with the `@vercel/kv` SDK.

## 📋 Setup Steps

### 1. Deploy to Vercel (if not already deployed)

```bash
# Push your code to GitHub first
git add .
git commit -m "Add shared leaderboard with Upstash Redis"
git push

# Then deploy via Vercel dashboard
# Go to: https://vercel.com/new
# Import your GitHub repository
```

### 2. Install Upstash Redis Integration

1. Go to the [Upstash for Vercel](https://vercel.com/marketplace/upstash) marketplace page
2. Click **Add Integration**
3. Select your project (`lbl-quiz`)
4. Choose setup method:
   - **Let Vercel Manage** (Recommended): Vercel handles everything, billing through Vercel
   - **Connect Existing Account**: Use your existing Upstash account

### 3. Create Redis Database

**If you chose "Let Vercel Manage":**
1. Select **Redis** product
2. Give it a name: `lbl-quiz-leaderboard`
3. Choose region(s) close to your users
4. Select plan (Free tier is fine!)
5. Click **Create**

**If you chose "Connect Existing Account":**
1. Log in to Upstash when redirected
2. Select or create a Redis database
3. Choose which Vercel project to connect

### 4. Connect to Your Project

1. In Vercel Dashboard → Your Project → **Integrations** → Upstash
2. Go to the database settings
3. Click **Connect to Project**
4. Select `lbl-quiz`
5. Environment variables are automatically added!
6. **Redeploy** your app for variables to take effect

### 5. For Local Development (Optional)

If you want to test the shared leaderboard locally:

1. In Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Copy the Upstash Redis environment variables (they start with `KV_`)
3. Create/edit `.env.local` in your project root
4. Paste the variables
5. Restart your dev server: `npm run dev`

**Example variables:**
```
KV_URL="redis://..."
KV_REST_API_URL="https://..."
KV_REST_API_TOKEN="..."
KV_REST_API_READ_ONLY_TOKEN="..."
```

### 6. Verify Setup

After deploying:
1. Visit your live site
2. Play the quiz and save a score
3. Check leaderboard - your score should appear!
4. Open in another browser/device - same leaderboard! 🎉

## 💰 Pricing

Upstash Redis Free tier includes:
- 10,000 commands per day
- 256 MB storage
- Global replication available
- Perfect for small apps like this quiz!

## 🔧 Troubleshooting

### "Failed to save score" error
- Make sure you've installed the Upstash integration and connected it to your project
- Verify environment variables are set: Vercel Dashboard → Settings → Environment Variables
- Check deployment logs for errors
- **Redeploy** after adding the integration

### Leaderboard not loading
- Check browser console for errors
- Test the API: visit `your-domain.vercel.app/api/leaderboard` (should return `[]` or data)
- Verify Upstash integration is connected in Vercel Dashboard → Integrations

### Local development not working
- Copy all 4 `KV_*` environment variables from Vercel to `.env.local`
- Restart dev server: kill and run `npm run dev` again
- Verify `.env.local` is in the root directory (next to `package.json`)

## 📝 How It Works

- **API Route:** `/app/api/leaderboard/route.ts` handles GET (fetch) and POST (save) requests
- **Storage:** Scores are stored in Upstash Redis under the key `lbl-quiz-leaderboard`
- **SDK:** Uses `@vercel/kv` package (compatible with Upstash Redis)
- **Data Format:** Array of top 5 scores: `[{name, score, date}, ...]`
- **Automatic Sorting:** API automatically keeps only top 5 highest scores
- **Global Access:** All users see the same leaderboard in real-time

## 📚 Learn More

- [Upstash for Vercel Documentation](https://upstash.com/docs/redis/howto/vercelintegration)
- [Vercel Marketplace - Upstash](https://vercel.com/marketplace/upstash)
- [@vercel/kv SDK Documentation](https://vercel.com/docs/storage/vercel-kv)

Enjoy your globally shared leaderboard! 🎄🏆
