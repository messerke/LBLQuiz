# 🎄 Christmas Lady or Ladyboy Quiz 🎄

A fun Christmas-themed quiz game built with Next.js and Tailwind CSS!

## 📸 Where to Add Your Images

### Image Location
Place all your image files in the following folder:
```
LBLQuiz/public/images/
```

### Image Naming Convention
Your images MUST follow this exact naming pattern:

**For Ladies:**
- `lady-1.jpg`
- `lady-2.jpg`
- `lady-3.jpg`
- ... and so on

**For Ladyboys:**
- `ladyboy-1.jpg`
- `ladyboy-2.jpg`
- `ladyboy-3.jpg`
- ... and so on

### Supported Image Formats
- `.jpg` / `.jpeg`
- `.png`
- `.webp`

**Important:** Make sure to update the image count in `app/page.tsx` if you have different numbers:
```typescript
// Line 11-12 in app/page.tsx
const ladyCount = 20 // Change this to match your actual lady image count
const ladyboyCount = 20 // Change this to match your actual ladyboy image count
```

### Example Structure
```
LBLQuiz/
└── public/
    └── images/
        ├── lady-1.jpg
        ├── lady-2.jpg
        ├── lady-3.jpg
        ├── ...
        ├── ladyboy-1.jpg
        ├── ladyboy-2.jpg
        ├── ladyboy-3.jpg
        └── ...
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd LBLQuiz
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production (Vercel)
```bash
npm run build
```

## 🎮 How the Quiz Works

1. **Start Screen:** Players see the title and can start the quiz or view the leaderboard
2. **Quiz Questions:** 11 randomly selected questions from your image pool
3. **Answer Feedback:** After each answer, players see if they were correct or wrong
4. **Final Score:** At the end, players see their score with a funny message
5. **Leaderboard:** Top 5 scores are shared globally using Upstash Redis (see setup below)

## 🏆 Score Messages

The quiz shows different funny messages based on score:
- **0-3 points:** Humorous failure messages
- **4-6 points:** Average performance jokes
- **7-9 points:** Congratulatory messages
- **10-11 points:** Perfect score celebration

## 🎨 Christmas Theme

The app features:
- Christmas color scheme (red, green, gold)
- Animated snowflakes
- Festive buttons and cards
- Holiday-themed messages

## 📱 Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy
5. Make sure your images are in the `public/images/` folder before deploying!

### 🗄️ Setting Up Shared Leaderboard

After deploying, you need to set up Upstash Redis for the shared leaderboard:

**See full instructions in [UPSTASH_REDIS_SETUP.md](UPSTASH_REDIS_SETUP.md)**

Quick steps:
1. Visit [Upstash for Vercel](https://vercel.com/marketplace/upstash)
2. Click "Add Integration" and select your project
3. Create a Redis database (free tier available!)
4. Connect to your project and redeploy
5. Done! Scores are now shared across all users

Without this setup, the leaderboard will be empty (but the quiz still works!).

## ⚙️ Customization

### Change Number of Questions
Edit line 25 in `app/page.tsx`:
```typescript
return questions.sort(() => Math.random() - 0.5).slice(0, 11)
// Change 11 to any number you want
```

### Change Leaderboard Size
Edit line 132 in `app/page.tsx`:
```typescript
.slice(0, 5) // Change 5 to any number you want
```

### Modify Score Messages
Edit the `getScoreMessage` function in `app/page.tsx` (lines 36-63)

## 🛠️ Tech Stack

- **Framework:** Next.js 16
- **React:** React 19
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Database:** Upstash Redis (via Vercel Marketplace)
- **SDK:** @vercel/kv
- **Deployment:** Vercel

## 📝 Notes

- The leaderboard is shared globally across all users via Upstash Redis
- Quiz questions are randomized each time
- Images should be clear and appropriate size for best display
- Recommended image aspect ratio: close to 4:5 (portrait)

Enjoy your Christmas quiz! 🎅🎁
