import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

type LeaderboardEntry = {
  name: string
  score: number
  date: string
}

const LEADERBOARD_KEY = 'lbl-quiz-leaderboard'

// GET - Fetch leaderboard
export async function GET() {
  try {
    const leaderboard = await kv.get<LeaderboardEntry[]>(LEADERBOARD_KEY)
    return NextResponse.json(leaderboard || [])
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json([], { status: 500 })
  }
}

// POST - Add new score
export async function POST(request: Request) {
  try {
    const newEntry: LeaderboardEntry = await request.json()

    // Validate the entry
    if (!newEntry.name || typeof newEntry.score !== 'number') {
      return NextResponse.json(
        { error: 'Invalid entry' },
        { status: 400 }
      )
    }

    // Get current leaderboard
    const currentLeaderboard = await kv.get<LeaderboardEntry[]>(LEADERBOARD_KEY) || []

    // Add new entry, sort, and keep top 5
    const updatedLeaderboard = [...currentLeaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)

    // Save back to KV
    await kv.set(LEADERBOARD_KEY, updatedLeaderboard)

    return NextResponse.json(updatedLeaderboard)
  } catch (error) {
    console.error('Error saving score:', error)
    return NextResponse.json(
      { error: 'Failed to save score' },
      { status: 500 }
    )
  }
}
