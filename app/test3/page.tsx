//This was originally made for my last project in webdev 2. All questions/ design have been reworked for this project.
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { setProgress } from '@/utils/progress'

export const fullQuestionPool = [
  { 
    question: 'Which bird is the national symbol of the United States?', 
    choices: ['Great Horned Owl', 'Bald Eagle', 'Mallard Duck', 'Raven'], 
    answer: 'Bald Eagle' 
  },
  { 
    question: 'Which bird has a white head and a yellow beak?', 
    choices: ['Osprey', 'Bald Eagle', 'Pelican', 'Sandhill Crane'], 
    answer: 'Bald Eagle' 
  },
  { 
    question: 'Which bird is known for hooting at night?', 
    choices: ['Trumpeter Swan', 'Great Horned Owl', 'Rufous Hummingbird', 'Canada Goose'], 
    answer: 'Great Horned Owl' 
  },
  { 
    question: 'Which owl has tufts that look like horns on its head?', 
    choices: ['Great Horned Owl', 'Raven', 'Steller’s Jay', 'Chickadee'], 
    answer: 'Great Horned Owl' 
  },
  { 
    question: 'Which bird is the fastest in the world, diving at over 300 km/h?', 
    choices: ['Peregrine Falcon', 'Osprey', 'Mallard Duck', 'Varied Thrush'], 
    answer: 'Peregrine Falcon' 
  },
  { 
    question: 'Which bird often nests on cliffs or tall buildings in cities?', 
    choices: ['Great Blue Heron', 'Peregrine Falcon', 'Marbled Murrelet', 'Canada Goose'], 
    answer: 'Peregrine Falcon' 
  },
  { 
    question: 'Which bird eats mostly fish and dives into water to catch them?', 
    choices: ['Raven', 'Osprey', 'Goldfinch', 'Harlequin Duck'], 
    answer: 'Osprey' 
  },
  { 
    question: 'Which bird has a wingspan of nearly 2 meters and is often seen wading in water?', 
    choices: ['Great Blue Heron', 'Mallard Duck', 'Common Loon', 'Rufous Hummingbird'], 
    answer: 'Great Blue Heron' 
  },
  { 
    question: 'Which large white bird has a pouch under its bill to scoop fish?', 
    choices: ['Trumpeter Swan', 'American White Pelican', 'Bald Eagle', 'Sandhill Crane'], 
    answer: 'American White Pelican' 
  },
  { 
    question: 'Which swan is the largest waterfowl in North America?', 
    choices: ['Trumpeter Swan', 'Mallard Duck', 'Canada Goose', 'Harlequin Duck'], 
    answer: 'Trumpeter Swan' 
  },
  { 
    question: 'Which duck is one of the most common in North America and has a green head?', 
    choices: ['Mallard Duck', 'Harlequin Duck', 'Marbled Murrelet', 'Chickadee'], 
    answer: 'Mallard Duck' 
  },
  { 
    question: 'Which duck’s babies can swim just hours after hatching?', 
    choices: ['Mallard Duck', 'Canada Goose', 'Loon', 'Pelican'], 
    answer: 'Mallard Duck' 
  },
  { 
    question: 'Which seabird nests in tall forest trees instead of cliffs?', 
    choices: ['Marbled Murrelet', 'Peregrine Falcon', 'Trumpeter Swan', 'Heron'], 
    answer: 'Marbled Murrelet' 
  },
  { 
    question: 'Which tall bird is known for its loud trumpeting call?', 
    choices: ['Sandhill Crane', 'Raven', 'Pelican', 'Goldfinch'], 
    answer: 'Sandhill Crane' 
  },
  { 
    question: 'Which diving bird makes eerie calls on lakes?', 
    choices: ['Common Loon', 'Mallard Duck', 'Harlequin Duck', 'Canada Goose'], 
    answer: 'Common Loon' 
  },
  { 
    question: 'Which bird is all black and can mimic human speech?', 
    choices: ['Raven', 'Chickadee', 'Osprey', 'Great Horned Owl'], 
    answer: 'Raven' 
  },
  { 
    question: 'Which bold blue bird often mimics hawks and steals food?', 
    choices: ['Steller’s Jay', 'Goldfinch', 'Kinglet', 'Osprey'], 
    answer: 'Steller’s Jay' 
  },
  { 
    question: 'Which orange and black bird sings a flute-like song in the forest?', 
    choices: ['Varied Thrush', 'Rufous Hummingbird', 'Marbled Murrelet', 'Loon'], 
    answer: 'Varied Thrush' 
  },
  { 
    question: 'Which tiny brown bird has a very loud song?', 
    choices: ['Pacific Wren', 'Chickadee', 'Kinglet', 'Harlequin Duck'], 
    answer: 'Pacific Wren' 
  },
  { 
    question: 'Which tiny bird often hangs upside-down while feeding?', 
    choices: ['Chickadee', 'Pelican', 'Great Blue Heron', 'Goose'], 
    answer: 'Chickadee' 
  },
  { 
    question: 'Which small bird has a hidden red crown that shows when excited?', 
    choices: ['Ruby-crowned Kinglet', 'Goldfinch', 'Rufous Hummingbird', 'Owl'], 
    answer: 'Ruby-crowned Kinglet' 
  },
  { 
    question: 'Which small yellow bird feeds mostly on seeds?', 
    choices: ['American Goldfinch', 'Raven', 'Loon', 'Steller’s Jay'], 
    answer: 'American Goldfinch' 
  },
  { 
    question: 'Which tiny bird can hover and even fly backwards?', 
    choices: ['Rufous Hummingbird', 'Pacific Wren', 'Mallard Duck', 'Pelican'], 
    answer: 'Rufous Hummingbird' 
  },
  { 
    question: 'Which bird digs tunnels in riverbanks to nest?', 
    choices: ['Belted Kingfisher', 'Mallard Duck', 'Goose', 'Raven'], 
    answer: 'Belted Kingfisher' 
  },
  { 
    question: 'Which bird has bright blue feathers and a crest on its head?', 
    choices: ['Steller’s Jay', 'Heron', 'Chickadee', 'Marbled Murrelet'], 
    answer: 'Steller’s Jay' 
  },
  { 
    question: 'Which bird is famous for migrating in a V-formation?', 
    choices: ['Canada Goose', 'Bald Eagle', 'Mallard Duck', 'Loon'], 
    answer: 'Canada Goose' 
  },
  { 
    question: 'Which small bird walks underwater in mountain streams?', 
    choices: ['American Dipper', 'Pacific Wren', 'Harlequin Duck', 'Kinglet'], 
    answer: 'American Dipper' 
  },
  { 
    question: 'Which bird often builds floating nests on lakes?', 
    choices: ['Common Loon', 'Pelican', 'Swan', 'Goose'], 
    answer: 'Common Loon' 
  },
  { 
    question: 'Which duck is very colorful and lives in fast-moving rivers?', 
    choices: ['Harlequin Duck', 'Mallard Duck', 'Pelican', 'Osprey'], 
    answer: 'Harlequin Duck' 
  },
  { 
    question: 'Which bird is tiny but sings a very loud and complex song?', 
    choices: ['Ruby-crowned Kinglet', 'Rufous Hummingbird', 'Pacific Wren', 'Goldfinch'], 
    answer: 'Ruby-crowned Kinglet' 
  }
]

function getRandomQuestions(pool: typeof fullQuestionPool, exclude: number[] = [], count = 10) {
  const availableIndices = pool
    .map((_, i) => i)
    .filter(i => !exclude.includes(i))

  const selected: number[] = []
  while (selected.length < count && availableIndices.length > 0) {
    const randIndex = Math.floor(Math.random() * availableIndices.length)
    selected.push(availableIndices.splice(randIndex, 1)[0])
  }

  return selected.map(i => {
    const original = pool[i]
    return {
      ...original,
      choices: shuffleArray(original.choices),
    }
  })
}

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function BirdQuiz() {
  const router = useRouter()

  const [usedIndices, setUsedIndices] = useState<number[]>([])
  const [questions, setQuestions] = useState(() => getRandomQuestions(fullQuestionPool))
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
  const [showCongrats, setShowCongrats] = useState(false)

  const score = Object.entries(selectedAnswers).filter(
    ([index, answer]) => answer === questions[Number(index)].answer
  ).length

  const handleAnswer = (index: number, choice: string) => {
    if (selectedAnswers[index]) return
    setSelectedAnswers({ ...selectedAnswers, [index]: choice })
  }

  const handleReset = () => {
    const currentIndices = questions.map(q => fullQuestionPool.indexOf(q))
    const newUsed = [...usedIndices, ...currentIndices]
    const newQuestions = getRandomQuestions(fullQuestionPool, newUsed)
    setQuestions(newQuestions)
    setSelectedAnswers({})
    setUsedIndices(newUsed)
  }

  const handleQuizComplete = async () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (!user?.id) {
      console.error('User not logged in')
      return
    }

    try {
      const res = await fetch('http://localhost:3001/complete-module3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: user.id,
          score: score,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setProgress('Module 3')
        setShowCongrats(true)
      } else {
        console.error(data.error || 'Failed to complete module 3')
      }
    } catch (err) {
      console.error('Module 3 request failed:', err)
    }
  }

  const allAnswered = Object.keys(selectedAnswers).length === questions.length
  const passed = score >= 8

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image
          src="/Sky background.png"
          alt="Birds Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="max-w-4xl w-full mx-auto mb-20 px-6 py-12 relative z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-sky-700 mb-6">
          Bird Quiz
        </h1>

        <p className="text-center mb-8 text-lg text-gray-700 font-medium">
          Test your bird knowledge! <br />
          <span className="text-2xl font-bold">{score} / {questions.length}</span>
        </p>

        {questions.map((q, index) => (
          <div key={index} className="mb-8 p-6 bg-blue-100 rounded-xl border border-blue-200 shadow-sm">
            <p className="font-semibold text-left mb-4 text-gray-800 text-lg">{index + 1}. {q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.choices.map((choice) => {
                const isSelected = selectedAnswers[index] === choice
                const isCorrect = choice === q.answer
                const hasAnswered = index in selectedAnswers

                let buttonStyle = 'w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 border'

                if (hasAnswered) {
                  if (isSelected && isCorrect) {
                    buttonStyle += ' bg-green-500 text-white border-green-600'
                  } else if (isSelected && !isCorrect) {
                    buttonStyle += ' bg-red-500 text-white border-red-600'
                  } else {
                    buttonStyle += ' bg-gray-200 text-gray-600 border-gray-300'
                  }
                } else {
                  buttonStyle += ' bg-blue-500 hover:bg-blue-700 text-white border-blue-500'
                }

                return (
                  <button
                    key={choice}
                    className={buttonStyle}
                    onClick={() => handleAnswer(index, choice)}
                    disabled={hasAnswered}
                  >
                    {choice}
                  </button>
                )
              })}
            </div>

            {selectedAnswers[index] && (
              <div className="mt-4 text-center font-bold text-lg">
                {selectedAnswers[index] === q.answer ? (
                  <span className="text-green-700">✅ Correct!</span>
                ) : (
                  <span className="text-red-700">❌ Incorrect. Try again next time!</span>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="text-center mt-10">
          <p className="mb-6 text-xl text-gray-800 font-semibold">
            Final Score: {score} / {questions.length}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleReset}
              className="bg-sky-700 hover:bg-sky-950 text-white px-6 py-3 rounded-xl shadow-md transition-colors duration-300 ease-in-out"
            >
              Reset
            </button>

            {allAnswered && passed && (
              <button
                onClick={handleQuizComplete}
                className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow transition"
              >
                Complete Module 3
              </button>
            )}
          </div>

          {showCongrats && (
            <div
              style={{
                position: 'fixed',
                bottom: '190px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                padding: '16px 24px',
                borderRadius: '12px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                zIndex: 2000,
                width: '280px',
                textAlign: 'center',
              }}
            >
              <p className="text-lg font-semibold mb-3 text-green-600">🎉 Congrats! You completed Module 3!</p>
              <button
                onClick={() => {
                  setShowCongrats(false)
                  router.push('/module4')
                }}
                style={{
                  backgroundColor: '#22c55e',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Continue
              </button>
            </div>
          )}

          {allAnswered && !passed && (
            <p className="mt-6 text-red-600 font-semibold text-lg">
              Sorry, you must get 8/10 questions correct to pass.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}