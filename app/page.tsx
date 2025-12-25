'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Quiz questions configuration - randomly selects 11 from your images
const generateQuestions = () => {
  // You'll have images named: lady-1.png, lady-2.png, etc. and ladyboy-1.png, ladyboy-2.png, etc.
  // Adjust these numbers based on how many images you have
  const ladyCount = 25 // 25 lady images
  const ladyboyCount = 27 // 27 ladyboy images

  const questions: Array<{ image: string; answer: 'lady' | 'ladyboy' }> = []

  // Add all ladies
  for (let i = 1; i <= ladyCount; i++) {
    questions.push({ image: `lady-${i}.png`, answer: 'lady' })
  }

  // Add all ladyboys
  for (let i = 1; i <= ladyboyCount; i++) {
    questions.push({ image: `ladyboy-${i}.png`, answer: 'ladyboy' })
  }

  // Shuffle and pick 11
  return questions.sort(() => Math.random() - 0.5).slice(0, 11)
}

type LeaderboardEntry = {
  name: string
  score: number
  date: string
}

const getScoreMessage = (score: number): string => {
  if (score >= 0 && score <= 3) {
    const messages = [
      "Are you even trying? Maybe get your eyes checked this Christmas! 🎅👓",
      "Santa's putting you on the naughty list for this performance! 😅",
      "You've got the vision of a snowman - literally blind! ⛄",
      "Did you just pick randomly? Because a coin flip would do better! 🪙"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  } else if (score >= 4 && score <= 6) {
    const messages = [
      "Not bad, not great... you're the lukewarm eggnog of this quiz! 🥛",
      "You're like a Christmas tree with half the lights working - meh! 🎄",
      "Average! You're the fruitcake of players - nobody's favorite! 🍰",
      "You passed... barely. Santa's undecided about you! 🤔"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  } else if (score >= 7 && score <= 9) {
    const messages = [
      "Impressive! You've got sharper eyes than Rudolph's nose is red! 🦌",
      "Well done! Santa's definitely bringing you presents this year! 🎁",
      "You're sleighing it! Almost perfect, champ! ⛷️",
      "Ho ho ho! Someone's been practicing! Great job! 🎅"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  } else {
    const messages = [
      "PERFECT SCORE! Are you some kind of wizard? 🧙‍♂️✨",
      "11/11! You're the Christmas miracle we needed! Move over, Jesus! 👼",
      "Flawless victory! Your powers of observation are legendary! 🏆",
      "ALL CORRECT! You should be crowned the King/Queen of Christmas! 👑"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }
}

const Snowflakes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="snowflake absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`,
            top: `-${Math.random() * 100}px`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'answered' | 'finished'>('start')
  const [questions, setQuestions] = useState<Array<{ image: string; answer: 'lady' | 'ladyboy' }>>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<'lady' | 'ladyboy' | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [playerName, setPlayerName] = useState('')
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  useEffect(() => {
    // Load leaderboard from localStorage
    const saved = localStorage.getItem('lbl-quiz-leaderboard')
    if (saved) {
      setLeaderboard(JSON.parse(saved))
    }
  }, [])

  const startGame = () => {
    setQuestions(generateQuestions())
    setGameState('playing')
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
  }

  const handleAnswer = (answer: 'lady' | 'ladyboy') => {
    setSelectedAnswer(answer)
    const correct = answer === questions[currentQuestion].answer
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
    setGameState('answered')
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
      setGameState('playing')
    } else {
      setGameState('finished')
    }
  }

  const saveScore = () => {
    if (!playerName.trim()) {
      alert('Please enter your name!')
      return
    }

    const newEntry: LeaderboardEntry = {
      name: playerName.trim(),
      score: score,
      date: new Date().toISOString(),
    }

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)

    setLeaderboard(updatedLeaderboard)
    localStorage.setItem('lbl-quiz-leaderboard', JSON.stringify(updatedLeaderboard))
    setShowLeaderboard(true)
  }

  const resetGame = () => {
    setGameState('start')
    setPlayerName('')
    setShowLeaderboard(false)
  }

  if (gameState === 'start') {
    return (
      <main className="min-h-screen bg-gradient-christmas flex items-center justify-center p-4">
        <Snowflakes />
        <div className="card-christmas max-w-2xl w-full relative z-10">
          <h1 className="text-5xl font-bold text-christmas-red text-center mb-4">
            🎄 Christmas Quiz 🎄
          </h1>
          <h2 className="text-3xl font-bold text-christmas-green text-center mb-6">
            Lady or Ladyboy?
          </h2>
          <p className="text-gray-700 text-center mb-8 text-lg">
            Test your observation skills with 11 festive questions!<br />
            Can you tell who's who? 🎅
          </p>
          <div className="space-y-4">
            <button onClick={startGame} className="button-christmas w-full text-xl">
              Start Quiz 🎁
            </button>
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="button-christmas-secondary w-full text-xl"
            >
              {showLeaderboard ? 'Hide' : 'Show'} Leaderboard 🏆
            </button>
          </div>

          {showLeaderboard && leaderboard.length > 0 && (
            <div className="mt-8 p-4 bg-christmas-snow rounded-lg">
              <h3 className="text-2xl font-bold text-christmas-green text-center mb-4">
                🏆 Top 5 Players 🏆
              </h3>
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-white rounded-lg shadow"
                  >
                    <span className="font-bold text-lg">
                      {index + 1}. {entry.name}
                    </span>
                    <span className="text-christmas-red font-bold text-xl">
                      {entry.score}/11
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    )
  }

  if (gameState === 'playing' || gameState === 'answered') {
    return (
      <main className="min-h-screen bg-gradient-christmas flex items-center justify-center p-4">
        <Snowflakes />
        <div className="card-christmas max-w-3xl w-full relative z-10">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-christmas-green">
                Question {currentQuestion + 1}/11
              </span>
              <span className="text-lg font-semibold text-christmas-red">
                Score: {score}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-christmas-red h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / 11) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-6 text-christmas-green">
            Lady or Ladyboy?
          </h2>

          <div className="mb-6 relative w-full aspect-[4/5] max-h-[700px] mx-auto bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={`/images/${questions[currentQuestion].image}`}
              alt="Quiz question"
              fill
              className="object-contain"
              priority
            />

            {/* Buttons overlaid at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
              {gameState === 'playing' ? (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAnswer('lady')}
                    className="button-christmas text-2xl py-6"
                  >
                    👩 Lady
                  </button>
                  <button
                    onClick={() => handleAnswer('ladyboy')}
                    className="button-christmas-secondary text-2xl py-6"
                  >
                    💃 Ladyboy
                  </button>
                </div>
              ) : (
                <div>
                  <div
                    className={`text-center text-2xl font-bold mb-4 p-4 rounded-lg ${
                      isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {isCorrect ? '✅ Correct!' : '❌ Wrong!'}
                    <div className="text-lg mt-1">
                      It was a {questions[currentQuestion].answer}!
                    </div>
                  </div>
                  <button onClick={nextQuestion} className="button-christmas w-full text-xl">
                    {currentQuestion < questions.length - 1 ? 'Next Question 🎄' : 'See Results 🎁'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (gameState === 'finished') {
    return (
      <main className="min-h-screen bg-gradient-christmas flex items-center justify-center p-4">
        <Snowflakes />
        <div className="card-christmas max-w-2xl w-full relative z-10">
          <h1 className="text-5xl font-bold text-christmas-red text-center mb-4">
            🎅 Quiz Complete! 🎅
          </h1>

          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-christmas-green mb-4">
              {score}/11
            </div>
            <div className="text-xl text-gray-700 italic bg-christmas-snow p-6 rounded-lg">
              {getScoreMessage(score)}
            </div>
          </div>

          {!showLeaderboard ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && saveScore()}
                className="w-full p-4 text-lg border-4 border-christmas-gold rounded-lg focus:outline-none focus:ring-4 focus:ring-christmas-red"
              />
              <button onClick={saveScore} className="button-christmas w-full text-xl">
                Save Score 🏆
              </button>
              <button onClick={resetGame} className="button-christmas-secondary w-full text-xl">
                Play Again 🎄
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6 p-4 bg-christmas-snow rounded-lg">
                <h3 className="text-2xl font-bold text-christmas-green text-center mb-4">
                  🏆 Top 5 Players 🏆
                </h3>
                <div className="space-y-2">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-3 rounded-lg shadow ${
                        entry.name === playerName && entry.score === score
                          ? 'bg-christmas-gold'
                          : 'bg-white'
                      }`}
                    >
                      <span className="font-bold text-lg">
                        {index + 1}. {entry.name}
                      </span>
                      <span className="text-christmas-red font-bold text-xl">
                        {entry.score}/11
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={resetGame} className="button-christmas w-full text-xl">
                Play Again 🎄
              </button>
            </div>
          )}
        </div>
      </main>
    )
  }

  return null
}
