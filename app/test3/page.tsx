//This was originally made for my last project in webdev 2. All questions/ design have been reworked for this project.
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { setProgress } from '@/utils/progress'

export const fullQuestionPool = [
  {
    question: 'Which bird builds enormous nests in tall trees and returns to them every year?',
    choices: ['Bald Eagle', 'Great Horned Owl', 'Osprey', 'Trumpeter Swan'],
    answer: 'Bald Eagle',
  },
  {
    question: 'Which bird can spot prey from over 3 kilometers away?',
    choices: ['Mallard Duck', 'Peregrine Falcon', 'Bald Eagle', 'Marbled Murrelet'],
    answer: 'Bald Eagle',
  },
  {
    question: 'Which bird flies silently at night and has a strong grip for catching prey?',
    choices: ['Pacific Wren', 'Great Horned Owl', 'Canada Goose', 'Raven'],
    answer: 'Great Horned Owl',
  },
  {
    question: 'Which bird reuses nests built by other animals and nests as early as January?',
    choices: ['Osprey', 'Raven', 'Great Horned Owl', 'Goldfinch'],
    answer: 'Great Horned Owl',
  },
  {
    question: 'Which bird dives at over 300 km/h to catch other birds in mid-air?',
    choices: ['Osprey', 'Peregrine Falcon', 'Steller’s Jay', 'Varied Thrush'],
    answer: 'Peregrine Falcon',
  },
  {
    question: 'Which bird nests on cliffs or tall buildings without building a traditional nest?',
    choices: ['Bald Eagle', 'American Dipper', 'Peregrine Falcon', 'Trumpeter Swan'],
    answer: 'Peregrine Falcon',
  },
  {
    question: 'Which bird eats mostly fish and has special toes for gripping slippery prey?',
    choices: ['Great Blue Heron', 'Osprey', 'Harlequin Duck', 'Raven'],
    answer: 'Osprey',
  },
  {
    question: 'Which bird dives feet-first into water and has oily feathers to stay dry?',
    choices: ['Peregrine Falcon', 'Osprey', 'Marbled Murrelet', 'Loon'],
    answer: 'Osprey',
  },
  {
    question: 'Which bird has short wings and a long tail to help it twist through forests?',
    choices: ['Great Blue Heron', 'Northern Goshawk', 'Canada Goose', 'Goldfinch'],
    answer: 'Northern Goshawk',
  },
  {
    question: 'Which bird hunts squirrels and defends its nest with surprising aggression?',
    choices: ['Steller’s Jay', 'Northern Goshawk', 'Bald Eagle', 'American Dipper'],
    answer: 'Northern Goshawk',
  }, 
  {
    question: 'Which duck has waterproof feathers and is one of the most common ducks in North America?',
    choices: ['Mallard Duck', 'Harlequin Duck', 'Trumpeter Swan', 'American Goldfinch'],
    answer: 'Mallard Duck',
  },
  {
    question: 'Which duck can swim just hours after hatching?',
    choices: ['Canada Goose', 'Mallard Duck', 'American Dipper', 'Sandhill Crane'],
    answer: 'Mallard Duck',
  },
  {
    question: 'Which seabird nests in trees far from the ocean and was a mystery to scientists until the 1970s?',
    choices: ['Common Loon', 'Marbled Murrelet', 'Mallard Duck', 'Harlequin Duck'],
    answer: 'Marbled Murrelet',
  },
  {
    question: 'Which bird flies up to 80 kilometers inland just to nest on a single tree branch?',
    choices: ['Bald Eagle', 'Osprey', 'Marbled Murrelet', 'Peregrine Falcon'],
    answer: 'Marbled Murrelet',
  },
  {
    question: 'Which tall bird is known for its trumpeting call and builds nests in wetlands?',
    choices: ['Sandhill Crane', 'Great Blue Heron', 'Canada Goose', 'Common Loon'],
    answer: 'Sandhill Crane',
  },
  {
    question: 'Which bird has a nearly 2-meter wingspan and swallows fish whole?',
    choices: ['Great Blue Heron', 'Trumpeter Swan', 'American White Pelican', 'Peregrine Falcon'],
    answer: 'Great Blue Heron',
  },
  {
    question: 'Which large white bird catches fish while floating and uses its bill like a scoop?',
    choices: ['Trumpeter Swan', 'Harlequin Duck', 'American White Pelican', 'Canada Goose'],
    answer: 'American White Pelican',
  },
  {
    question: 'Which swan mates for life and returns to the same wetland to build giant nests?',
    choices: ['Mallard Duck', 'Trumpeter Swan', 'Canada Goose', 'Great Blue Heron'],
    answer: 'Trumpeter Swan',
  },
  {
    question: 'Which colorful duck dives in fast-moving rivers and builds nests under logs or rocks?',
    choices: ['Harlequin Duck', 'Common Loon', 'American Goldfinch', 'Mallard Duck'],
    answer: 'Harlequin Duck',
  },
  {
    question: 'Which diving bird builds floating nests and struggles to walk on land?',
    choices: ['Canada Goose', 'Common Loon', 'Sandhill Crane', 'American Dipper'],
    answer: 'Common Loon',
  },
    {
    question: 'Which intelligent forest bird can mimic human speech and remember faces?',
    choices: ['Steller’s Jay', 'Raven', 'Ruby-crowned Kinglet', 'Great Horned Owl'],
    answer: 'Raven',
  },
  {
    question: 'Which bold blue bird hides food and sometimes mimics hawk calls?',
    choices: ['Steller’s Jay', 'Pacific Wren', 'Mallard Duck', 'Peregrine Falcon'],
    answer: 'Steller’s Jay',
  },
  {
    question: 'Which shy bird has a flute-like song and forages on the forest floor?',
    choices: ['Varied Thrush', 'Chickadee', 'Goldfinch', 'Bald Eagle'],
    answer: 'Varied Thrush',
  },
  {
    question: 'Which tiny bird sings very loudly and builds dome-shaped nests in moss?',
    choices: ['Pacific Wren', 'Ruby-crowned Kinglet', 'American Goldfinch', 'Steller’s Jay'],
    answer: 'Pacific Wren',
  },
  {
    question: 'Which small forest bird stores food and hangs upside-down to feed?',
    choices: ['Chickadee', 'Common Loon', 'Canada Goose', 'Belted Kingfisher'],
    answer: 'Chickadee',
  },
  {
    question: 'Which tiny bird builds nests from spider silk and can fly backwards?',
    choices: ['Rufous Hummingbird', 'Pacific Wren', 'Ruby-crowned Kinglet', 'Steller’s Jay'],
    answer: 'Rufous Hummingbird',
  },
  {
    question: 'Which bird nests in tunnels along riverbanks and beats fish before eating?',
    choices: ['Belted Kingfisher', 'Great Blue Heron', 'Varied Thrush', 'Raven'],
    answer: 'Belted Kingfisher',
  },
  {
    question: 'Which yellow bird feeds on seeds and builds tightly woven nests?',
    choices: ['American Goldfinch', 'Steller’s Jay', 'Mallard Duck', 'Northern Goshawk'],
    answer: 'American Goldfinch',
  },
  {
    question: 'Which bird is very small, but sings a loud and complex song?',
    choices: ['Ruby-crowned Kinglet', 'Rufous Hummingbird', 'Pacific Wren', 'Goldfinch'],
    answer: 'Ruby-crowned Kinglet',
  },
  {
    question: 'Which bird has a red crown that only shows when it’s excited?',
    choices: ['Ruby-crowned Kinglet', 'American Dipper', 'Belted Kingfisher', 'Raven'],
    answer: 'Ruby-crowned Kinglet',
  },
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